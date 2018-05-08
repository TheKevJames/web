// util
function shuffle(a) {
    for (let i = a.length; i; i -= 1) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// quotes
function hsv_to_rgb(h, s, v) {
    let i = Math.floor(h * 6);

    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - s + f * s);

    let r, g, b;
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function rgb_to_html(rgb) {
    return 'rgb(' + rgb.r + ',' + rgb.g  + ',' + rgb.b + ')';
}

var golden_ratio_conjugate = 0.618033988749895;
let h = Math.random();
function get_next_random_color() {
    h = (h + golden_ratio_conjugate) % 1;
    return hsv_to_rgb(h, 0.5, 0.95);
}

async function update(eid, qid, qnid, quote, step_delay) {
    let qoid = '#quote-old';

    // set #quote-next text
    $(qnid).text(quote);

    // move out #quote
    let random_value = Math.random();
    if (random_value < 0.25) {
        $(qid).animate({
            'margin-top': '-200px',
            'opacity': '0'
        }, step_delay);
    } else if (random_value < 0.5) {
        $(qid).animate({
            'margin-left': '-100px',
            'opacity': '0'
        }, step_delay);
    } else if (random_value < 0.75) {
        $(qid).animate({
            'margin-top': '100px',
            'opacity': '0'
        }, step_delay);
    } else {
        $(qid).animate({
            'margin-left': '100px',
            'opacity': '0'
        }, step_delay);
    }
    await sleep(step_delay);
    $(qid).attr('id', 'quote-old');

    // update bg color
    let color = rgb_to_html(get_next_random_color());
    $(eid).css('background-color', color);

    // move in #quote-next (as #quote)
    $(qnid).attr('id', 'quote');
    $(qid).animate({
        'margin-top': '-' + ($(qid).height() / 2) + 'px',
        'margin-left': '0',
        'opacity': '1'
    }, step_delay); // -48/2 per line
    await sleep(step_delay);

    // prep #quote (as #quote-next)
    $(qoid).attr('id', 'quote-next');
}

async function update_from_list(eid, qid, qnid, quotes, delay) {
    shuffle(quotes);
    for (let i = 0; i < quotes.length; i += 1) {
        await update(eid, qid, qnid, quotes[i], delay / 5);
        await sleep(delay);
    }
}
