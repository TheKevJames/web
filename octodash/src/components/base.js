import React from 'react';
import moment from 'moment';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      items: [],
      loaded: false,
    };
  }

  componentDidMount() {
    Promise.all(this.queries.map(query => {
        return fetch(`https://api.github.com/search/issues?q=${query}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'octodash',
          }})
          .then(res => {
            if (!res.ok) { throw Error(res.statusText); }
            return res;
          })
          .then(res => res.json())
          .then((result) => result.items,
                (error) => { throw Error(error) })
      }))
      .catch(err => this.setState({error: err, loaded: true}))
      // TODO: sort order
      .then(results => this.setState({loaded: true, items: [].concat.apply([], results)}));
  }

  render() {
    const { error, items, loaded } = this.state;
    if (!loaded) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div className="issues-listing">
          <ul className="border-right border-bottom border-left js-navigation-container js-active-navigation-container">
            {items.map(item => (
              <li key={item.id} className="Box-row Box-row--focus-gray p-0 js-navigation-item js-issue-row read">
                <div className="d-table table-fixed width-full Box-row--drag-hide position-relative">
                  <div className="lh-condensed p-2">
                    <a className="v-align-middle muted-link h4 pr-1" href={item.repository_url.replace('api.', '').replace('repos/', '')}>{item.repository_url.slice(29)}</a>
                    <a className="link-gray-dark v-align-middle no-underline h4 js-navigation-open" href={item.html_url}>{item.title}</a>
                    {item.labels.length > 0
                      ? (<span className="labels lh-default">
                        {item.labels.map(label => (
                          // TODO: padding?
                          <span key={label.id} className={`d-inline-block IssueLabel v-align-text-top labelstyle-${label.color} linked-labelstyle-${label.color}`} style={{backgroundColor: `#${label.color}`}} title={label.name}>
                            <span className="label-text">{label.name}</span>
                          </span>
                        ))}
                      </span>)
                      : null
                    }
                    <div className="mt-1 text-small text-gray">
                      <span className="opened-by">opened {moment(item.created_at).fromNow()} by </span>
                      <span className="muted-link"><a href={item.user.html_url}>{item.user.login}</a></span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default Base;
