import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        accounts: JSON.parse(localStorage.getItem('octodash-accounts')),
    }
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCreate(event) {
    if (event.key !== 'Enter') {
      return false;
    }

    const token = event.target.value;
    fetch(`https://api.github.com/user`, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Token ${token}`,
        'User-Agent': 'octodash',
      }})
      .then(result => {
        if (!result.ok) { throw Error('GitHub could not validate token'); }
        return result;
      })
      .then(result => result.json())
      .then(result => {
        this.setState({
          accounts: this.state.accounts.concat([{
            name: result.login,
            token: token,
          }]),
        });
        localStorage.setItem('octodash-accounts', JSON.stringify(this.state.accounts));
      })
      .catch(error => alert(`Could not authenticate. ${error}`));
  }

  handleDelete(name) {
    window.confirm('Are you sure you want to delete this?');

    this.setState({
        accounts: this.state.accounts.filter(function(account) {
          return account.name !== name;
        }),
    });
    localStorage.setItem('octodash-accounts', JSON.stringify(this.state.accounts));

    return false;
  }

  render() {
    const { accounts } = this.state;
    return (
      <div className="position-relative js-header-wrapper ">
        <header className="Header  f5">
          <div className="d-flex flex-justify-between px-3 container-lg">
            <div className="d-flex flex-justify-between ">
              <a className="header-logo-invertocat" href="/">
                <svg height="32" className="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z">
                  </path>
                </svg>
              </a>
            </div>
            <div className="HeaderMenu d-flex flex-justify-between flex-auto">
              <div className="d-flex">
              </div>
              <div className="d-flex">
                <ul className="user-nav d-flex flex-items-center list-style-none">
                  <li className="dropdown">
                    <details className="details-expanded details-reset js-dropdown-details d-flex px-2 flex-items-center">
                      <summary className="HeaderNavlink">
                        <svg className="octicon octicon-plus float-left mr-1 mt-1" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z"></path>
                        </svg>
                        <span className="dropdown-caret mt-1"></span>
                      </summary>
                      <div className="dropdown-menu dropdown-menu-sw show-more-popover text-gray-dark anim-scale-in">
                          {accounts.map(account => (
                            <div key={account.name} className="width-full inline-form js-comment-delete" >
                              <button className="dropdown-item menu-item-danger btn-link" onClick={() => this.handleDelete(account.name)}>
                                {account.name}
                              </button>
                            </div>
                          ))}
                          <label className="dropdown-item btn-link js-comment-edit-button">
                            Add: <input type="text" value={this.state.newTokenValue} onKeyPress={this.handleCreate} />
                          </label>
                      </div>
                    </details>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
