title: Tensorflow Model Optimization
date: 2019-06-08
tags: Technology
description: An experiment in eking out Tensorflow performance on a single CPU

This post represents an experiment in eking as much performance as I can get
out of an arbitrary Tensorflow model, while treating the model as a black box
and avoiding the use of more than a single CPU.

This code is available in my
[experiments Github repository](https://github.com/TheKevJames/experiments/tree/master/tensorflow-perf),
if you'd like to follow along. More specifically,
[here's the commit range](https://github.com/TheKevJames/experiments/compare/9b3c103b155dadf31148841cd4b6de1e8b9092ae...1d02e64aa992b130164ff855615078beb5341e76).

> tl;dr: massive speed improvement comes from using MKL libs, compiling
> Tensorflow with the right instruction sets, and saving/freezing/optimizing
> your model file.

### Starting Point

I started off by grabbing the
[g2p_en](https://github.com/Kyubyong/g2p/tree/7caf9d695b178c83f9c3d3e16c3f0a4f4d4d03a2)
library off of Github. More specifically, I grabbed the commit immediately
before they tossed everything out and re-wrote in in `numpy` instead of
`Tensorflow`.

A couple quick refactors to remove all the training-specific code, make sure
everything's working well in Python 3.x, and we've got ourself an initial
commit ([74def2c6](https://github.com/TheKevJames/experiments/commit/74def2c656bdaa434eb99945e20a789cf3c6956a)).
More interestingly, a barebones benchmarking script to get us started
([36401b8f](https://github.com/TheKevJames/experiments/commit/36401b8f93b7ede0a4ade5a76acfe7ed3a73a1ad)).

From there, we can start jumping into the good stuff.

![initial results](https://raw.githubusercontent.com/TheKevJames/experiments/master/tensorflow-perf/results/initial.png "Initial Results")

Oh yeah, that's the stuff.

### Compiling with Faster Instruction Sets

One of the first things you'll notice about running Tensorflow is a whole bunch
of warnings about how everything is going to soon be deprecated, you're doing
everything wrong, your mother never loved you, and how you should have known
better than to just install Tensorflow directly from `PyPI`; after all, why on
Earth would you imagine installing a python package would just involve doing a
`pip install tensorflow`?

Nope, whenever you `import tensorflow`, you'll get treated to a love message
telling you just what you're missing out on:

    Your CPU supports instructions that this TensorFlow binary was not compiled to use: AVX2 FMA

You might need to dig through a few pages of messages to find that, mind. I
highly recommend

    #!python
    logging.getLogger('tensorflow').disabled = True

Back to the instruction sets: every CPU supports some subset of a bunch of
possible instruction sets. These act as extensions to how your CPU performs by
providing newer (heopfully better) interfaces for some operations. You can see
for yourself which ones your machine supports by running:

    #!bash
    cat /proc/cpuinfo | grep flags

or, if you're a ~~heathen~~ OSX user:

    #!bash
    sysctl machdep.cpu.features

More likely than not there's a huge amount of things in this list, many of
which are completely irrelevant in our case; Tensorflow really only cares about
some of these: `AVX*`, `FMA`, and `SSE*`. If you compile Tensorflow with flags
telling it which of these sets it can play with at run time, it will
automatically use the faster instructions whenever possible.

A couple gotchas when compiling your own Tensorflow:

- your build machine and runtime machine have to be identical in all the ways
  that count: same base OS versions, same python versions, same header versions
  for anything that gets linked, same CPU architecture, etc. I highly recommend
  the use of Docker and prayer to make sure these stay matched up.

- Any instruction sets you enable *must* be available at runtime or the whole
  thing will collapse. If your Tensorflow doesn't support some instructions you
  have available you just get a bit sad at the wasted time spent; if your
  Tensorflow is compiled with instructions that you don't have then Weird
  Things will happen. Best case is that everything crashes horrendously.

- Tensorflow uses an outdated version of [bazel](https://bazel.build/) as its
  build system. It uses it incorrectly by abusing commands which have been
  deprecated for years and emits literally thousands upon thousands of lines of
  compiler errors over the course of its several hour long compilation. When in
  doubt, and you should be, run away screaming.

All that aside, it could certainly be worse. Grab their build Dockerfile,
adjust a few flags, then go catch a movie or two while it compiles.
[Here's my Dockerfile](https://github.com/TheKevJames/experiments/blob/713ff5ea81b0c158ce860d99b48504f477d5b8a5/tensorflow-perf/tensorflow/Dockerfile)
for enabling AVX2 and FMA. The relevant lines are right near the bottom.

![avx2 and fma](https://raw.githubusercontent.com/TheKevJames/experiments/master/tensorflow-perf/results/avx2_and_fma.png "AVX2 and FMA")

Just swapping in the manually compiled version of Tensorflow with the new
instructions is enough to give us a nice little 1.2x speedup. Good start, but
there are even better things to do with our compiler.

### Use Intel MKL Libraries

The Intel MKL libraries are, in their own words, "the fastest and most-used
math libraries for Intel-based systems". That's a bold claim, but I suppose
they would know. I must admit, I didn't research whether there were any great
alternatives, since Tensorflow has some MKL bindings so I knew it should be
guaranteed to drop in pretty well. Plus, they're written in FORTRAN in 2019,
and you've just gotta love that.

I hope you weren't following along too closely, since using the MKL libraries
are going to require re-compiling Tensorflow from scratch again. This time, we
need to
[install the MKL libs](https://software.intel.com/en-us/articles/installing-intel-free-libs-and-python-apt-repo)
(to both your build system and your runtime one!) and drop a `--config=mkl`
into your build flags. If you were using `clang` like I was, this is also the
right time to switch to `gcc`, since there's some janky stuff going on in the
build that will break if you're not on `gcc >= 6.2` or so.

Have you recompiled Tensorflow a second time yet? No? That's ok, I'll wait. I
didn't mean to rush you.

![mkl](https://raw.githubusercontent.com/TheKevJames/experiments/master/tensorflow-perf/results/mkl.png "MKL")

Huh, that's not good! 5-10x *worse* after enabling the optimized math
libraries, that wasn't what I was hoping for. What could be going wrong here?

Oh -- and just a heads up, my MKL-enabled compilation is
[public on Gemfury](https://manage.fury.io/2/indexes/python/thekevjames/download/tensorflow-1.13.1-cp37-cp37m-linux_x86_64.whl),
so you can feel free to save yourself the multi-hour compilation.

#### Fixing the Intel MKL Libraries

One of the most common tactics in making things faster is doing multiple things
at once. This doesn't always work out exactly how we'd like it to (*cough cough
every major security issue ever*) and often gives us the exact opposite result
of what we're looking for. Performance-wise, this often comes down to the
difference between *concurrency* and *parallelism*; concurrency is when
multiple tasks can overlap in time, ie. if they both start before either end,
whereas parallelism is when those tasks run at *literally the same time*, eg.
by running on different cores or something like that.

Depending on what you're trying to do, these styles have incredibly different
effects. If you're sending a bunch of HTTP requests and a bunch of your tasks
are just waiting patiently for the responses, sitting idle while they wait,
then concurrency is great! In that case, parallelism is entirely unnecessary;
you're not really doing anything with the fact that those tasks are running
simultaneously. You're... waiting extra hard, I suppose?

On the other hand, if you're trying to compute the gazillionth digit of pi,
phi, e, and twelve, concurrency ain't gonna do much for you; if you're only
working on one of those tasks at a time anyway, why both with the concurrency?
There's always going to be at least a bit of overhead spent switching between
those tasks which could be better spent by, uh, not doing that. Parallelism, on
the other hand, would make this set of tasks complete much faster!

One more factor to be aware of here (well, two more, but I'll make them both
short sentences, I swear). Python has a GIL (global interpreter lock), which
means that only a single thread can be running at a given time; if we try to be
clever by splitting one task into two with the intention of them being in
parallel, but there's no spare CPU/core/process/etc to run that task on, its
just going to get in our way.

Turns out that's exactly what's happening here! Tensorflow has some flags for
this in their config `inter_op_parallelism_threads` and
`intra_op_parallelism_threads`. When unset, they both default to "please guess
for me", which clearly wasn't working so great. Turns out they were looking at
logical rather than physical cores, and I'm running all these tests in Docker,
and... well, a topic for another time, maybe.

Anyway, setting these both down to `1` as they should be drastically improves
things.

![mkl single thread](https://raw.githubusercontent.com/TheKevJames/experiments/master/tensorflow-perf/results/mkl_single_thread.png "MKL (single-threaded)")

Note that things have *improved* but their still not actually *good*.

Ah! Its not just Tensorflow which has these flags. OpenMP, which is used by the
MKL libraries, has its own way of doing a pretty similar thing.

    #!bash
    export OMP_NUM_THREADS=1

![mkl single thread_omp](https://raw.githubusercontent.com/TheKevJames/experiments/master/tensorflow-perf/results/mkl_single_thread_omp.png "MKL (single-threaded w/ OpenMP)")

Alright, now I'm feeling pretty happy about these libraries; with a speedup of
\~5.9x, we've made some great progress.

### RTFM'ing

The last "obvious" thing to check would be the
[Tensorflow Performance Guide](https://www.tensorflow.org/guide/performance/overview).
A quick glance at that shows that we've mostly already followed the advice: we
are using MKL, we've optimized our MKL threads, we're using a dynamic RNN
rather than fully fused layers or a static RNN.

About the only thing from that guide we haven't done is avoid using the
`feed_dict` argument to `tf.Session.run()` -- but that's irrelevant in our
case, since the advantage of moving away from `feed_dict` is to perform
CPU-bound operations while your GPU is otherwise busy inferring. Since we're
not using a GPU at all, its time to break out a profiler and investigate for
ourselves.

Note that this (and other things that I'll be glossing over entirely) would
absolutely be a great optimization to explore if we were willing to make use of
a GPU. But I mean, come on: running neural nets on CPUs, who does that?

### Profiling

As I turned to start doing some profiling and figure out the next big problem
area to tackle, I discovered that my beloved
[Pyflame](https://github.com/uber/pyflame) tool has pretty much entirely
stalled its development since the original author left Uber. Since it doesn't
support Py 3.7, I'll just have to fall back to my *second* most favouritist
ptracing profiler [py-spy](https://github.com/benfred/py-spy).

That's a whole bunch less useful than I had hoped it would be. Turns out we're
spending the vast majority of our time within Tensorflow on
[this line](https://github.com/tensorflow/tensorflow/blob/6612da89516247503f03ef76e974b51a434fb52e/tensorflow/python/client/session.py#L1405)
which is the line for, you know, running our model. I suppose I should have
been a bit less surprised.

On the plus side, though, that tells us more about what to explore next:
optimizing our model.

### Model Saving

So it turns out that the **model** that had been **saved** to disk wasn't
actually what the Tensorflow folks call a "saved model". Model that has been
saved, saved model; two completely different things. There's a simple fix for
that, mind, using `saved_model.simple_save`.

    #!python
    tf.saved_model.simple_save(
        SESSION,
        '/build',
        inputs={'x': GRAPH.x, 'y': GRAPH.y},
        outputs={'preds': GRAPH.preds}
    )

If the alliteration and oddly off-base naming has killed you yet, don't worry,
we'll get there. Turns out `simple_save` doesn't seem to actually save the
whole model. If you try to actually _use_ the saved model, it'll complain about
missing pieces.

The solution is to grab parts of the old model (eg. some of the final
checkpoint metadata) and stuff 'em into the new model. If you're trying to
apply this to a different model, you'd be looking for the final checkpoint data
here.

    #!bash
    mv ./oldmodel/model.ckpt.data-00000-of-0000n ./newmodel/variables/variables.data-00000-of-0000n
    mv ./oldmodel/model.ckpt.data-00001-of-0000n ./newmodel/variables/variables.data-00001-of-0000n
    # etc
    mv ./oldmodel/model.ckpt.index ./newmodel/variables/variables.index

At this point, we can modify our code to make use of the `SavedModel`, rather
than the checkpoints:

    #!diff
    - saver.restore(SESSION, tf.train.latest_checkpoint(OLD_MODEL_PATH))
    + tf.saved_model.load(SESSION, ['serve'], NEW_MODEL_PATH)

At this point, we haven't actually made any changes to the model yet, other than
some internal things about how its loaded, but just to double check...

![saved model](https://raw.githubusercontent.com/TheKevJames/experiments/master/tensorflow-perf/results/savedmodel.png "Saved Model")

Yup, whew, no change, the world continues to make sense.

### Model Freezing

Next step is to "freeze" the model, which will prune unnecessary nodes,
de-duplicate repeated variables, and generally make things `const` wherever
possible. This in itself has some potential to be an optimization, but not by
more than a percent or two:

    #!python
    output_graph_def = tf.graph_util.convert_variables_to_constants(
        SESSION, SESSION.graph_def, ['preds'])
    with tf.gfile.GFile('frozen_model.pb', 'wb') as f:
        f.write(output_graph_def.SerializeToString())

Note that at this point I found out that `Graph.preds` had not previously
been assigned a name/label and thus could not be exported, which meant I had to
go back and re-save the model after adding that label. TIL: its not the name of
the variable which is used, but the literal `.name` attribute attached to that
variable. For example, the following class has a variable named `bar`, not one
named `foo`:

    #!python
    class Graph:
        def __init__(self):
            self.foo = tf.placeholder(tf.int32, shape=(None, 42), name='bar')

Anywho, this step gives us a `frozen_model.pb` file. Let's switch to loading
it instead of our `SavedModel`.

    #!diff
    + with tf.gfile.GFile(MODEL_PATH, 'rb') as f:
    +     graph_def = tf.GraphDef()
    +     graph_def.ParseFromString(f.read())
    g = tf.Graph()
    -     GRAPH = Graph()
    +     tf.import_graph_def(graph_def, name='prefix')
    SESSION = tf.Session(graph=g)
    - tf.saved_model.load(SESSION, ['serve'], MODEL_PATH)

Note that we no longer need to have the `Graph` class at all, which makes it
possible for this module to include exclusively runtime-only code rather than
including anything which is only really a part of the training step! At this
point, the model is the only deliverable we need and it can be treated entirely
as a black box. The only parts we still need to know are the shapes or the
inputs and outputs -- but it turns out we can get that back out of the model
rather than needing to pull it off of the original training object.

    #!diff
    - SESSION.run(model.preds, {model.x: x, model.y: y})
    + model_preds = g.get_tensor_by_name('prefix/preds:0')
    + model_x = g.get_tensor_by_name('prefix/grapheme:0')
    + model_y = g.get_tensor_by_name('prefix/phoneme:0')
    + SESSION.run(model_preds, {model_x: x, model_y: y})

![frozen model](https://raw.githubusercontent.com/TheKevJames/experiments/master/tensorflow-perf/results/frozenmodel.png "Frozen Model")

This brings us to a speedup of 6x -- technically a bit more than we had before,
but nothing to write home about. Hopefully, all the biggest improvements will
come in the next step (he says, as if he hadn't already done that step).

### Model Optimization

So far we've done a whole lot of busy work to convert from checkpointed models
to a frozen model. Now, not to say its been entirely useless: we got to trim
out a bunch of code that's now only necessary for training, we cut our model
size down from 4.8MB to 1.5MB, and we learned the value of friendship in the
process.

But the real point of doing this this migration is so that we can make use of
the
[Graph Transform tool](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/tools/graph_transforms/README.md).
Let's apply a bunch of standard optimization transforms and see if they help.
Specifically, we're going to call a bunch of operations that mostly do exactly
hat they say they do:

- `fold_batch_norms` and `fold_old_batch_norms`: merge batch normalization
  multiplications with any multiplications from the previous layer. There are
  two implementations of batch normalization in Tensorflow, so we need to
  specify both.
- `fold_constants`
- `merge_duplicate_nodes`
- `remove_nodes(op=Identity)`: strip identity operations (eg. no-ops) from the
  model. Note that this operation will break your model if you use control flow
  operations (as we do), so I won't be applying it.
- `remove_nodes(op=CheckNumerics)`: this one also isn't always safe to remove;
  it is meant to catch NaNs and Infs getting passed in. In our case, we know our
  inputs must already be non-negative integers (and pretty darn small ones at
  that), so we're good to remove these.
- `strip_unused_nodes`

These transformations will get applied in the order we specify, so its
important to eg. remove unused nodes before folding constants, since the
removal of unused nodes may make the constant folding catch more cases.

    #!python
    optimized_graph_def = tensorflow.tools.graph_transforms.TransformGraph(
        SESSION.graph_def,
        ['grapheme', 'phoneme'],
        ['preds'],
        [
            'strip_unused_nodes',
            'remove_nodes(op=CheckNumerics)',
            'merge_duplicate_nodes',
            'fold_constants',
            'fold_batch_norms',
            'fold_old_batch_norms',
        ])
    tf.train.write_graph(
        optimized_graph_def,
        '/src/g2p/model/saved',
        'optimized_model.pb',
        as_text=False)

With a speedup of 6.19x, we're making (some) progress, though I'll admit I'd
been hoping for more.

![optimized model](https://raw.githubusercontent.com/TheKevJames/experiments/master/tensorflow-perf/results/optimizedmodel.png "Optimized Model")

There's a few other transformations which could be helpful in optimizing
performance but do so at the expense of accuracy, which is a whole can of worms
I don't want to open at the point. If you're interested, grep for "quantize" in
the Graph Transformation docs.

### Profiling, Again

That about covers all I know about optimizing Tensorflow itself -- but what
about the rest of our codebase? Let's do some more profiling -- this time with
the [line_profiler](ttps://github.com/rkern/line_profiler) module, since
getting a line-by-line look at the `g2p.predict` method will hopefully show us
something exciting.

    #!bash
    $ docker run --rm -it \
          --cpus=1 --memory=4G \
          tfopt \
          kernprof -lv /src/profile.py
    Total time: 12.6606 s
    File: /src/g2p/predict.py
    Function: predict at line 12
    Line #      Hits         Time  Per Hit   % Time  Line Contents
    ==============================================================
        12                                           @profile
        13                                           def predict(text: str) -> typing.List[str]:
        14        70        808.0     11.5      0.0      words = [w.lower() for w in text.split()]
        15        70        144.0      2.1      0.0      if len(words) > MAX_LEN:
        16                                                   raise Exception(f'can not process >{MAX_LEN} words')
        17
        18        70        545.0      7.8      0.0      x = np.zeros((len(words), MAX_LEN), np.int32)  # 0: <PAD>
        19       680        989.0      1.5      0.0      for i, w in enumerate(words):
        20      3840       5665.0      1.5      0.0          for j, g in enumerate((w + 'E')[:MAX_LEN]):
        21      3230       5859.0      1.8      0.0              x[i][j] = GRAPHEME_TO_INDEX.get(g, 2)  # 2: <UNK>
        22
        23                                               # Auto-regressive inference
        24        70        233.0      3.3      0.0      preds = np.zeros((len(x), MAX_LEN), np.int32)
        25      1470       2674.0      1.8      0.0      for j in range(MAX_LEN):
        26      1400   12597953.0   8998.5     99.5          _preds = SESSION.run(GRAPH.preds, {GRAPH.x: x, GRAPH.y: preds}
    )
        27      1400      15989.0     11.4      0.1          preds[:, j] = _preds[:, j]
        28
        29                                               # convert to string
        30        70        108.0      1.5      0.0      phonemes = []
        31       680       1104.0      1.6      0.0      for pred in preds:
        32       610      25127.0     41.2      0.2          p = [INDEX_TO_PHONEME[idx] for idx in pred]
        33       610       1044.0      1.7      0.0          if '<EOS>' in p:
        34       610       1395.0      2.3      0.0              p = p[:p.index('<EOS>')]
        35
        36       610        901.0      1.5      0.0          phonemes.append(p)
        37
        38        70         82.0      1.2      0.0      return phonemes

Or, you know, maybe not. A bit of low-hanging fruit in the unnecessary `_preds`
assignment, but overall there's very little to do here. The Tensorflow
operations take such a vast majority of the time spent that everything else is
completely eclipsed.

Either way, this is a pretty nice place to be. Our final results definitely
show some great progress having been made. Let's take a look at our range of results and bask in our glorious evolution.

![final results](https://raw.githubusercontent.com/TheKevJames/experiments/master/tensorflow-perf/results/final.png "Final Results")

### Final Thoughts and Follow-Up

So how would we draw out even more power here, if we want to go absolutely
crazy?

- GPU decoding, of course. Not just for the speedup, but also for the batching:
  on a GPU, we'd be able to run multiple inference tasks at once, and do all
  our CPU-bound work in the meantime.

- Model-modifying changes. Things like quanitizing our data down to a smaller
  byte size or playing with alternate model architectures which aren't quite as
  heavy-weight.

- Dump Python. Python's Tensorflow implementation is decent, but switching over
  to, say, C++'s Tensorflow Serving architecture could be a whole bunch faster.
  I'm not 100% sold on the idea of their standard approach of building a
  client/server architecture and interacting via gRPC, but I'm sure the runtime
  is faster.

- Take a look at the Tensorflow internals. There's no way they've implemented
  every possible speedup, there's gotta be improvements which can be made.
