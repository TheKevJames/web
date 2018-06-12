import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        accounts: JSON.parse(localStorage.getItem('octodash-accounts')) || [],
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
        if (!result.ok) { throw Error('GitHub could not validate token.'); }
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
        accounts: this.state.accounts.filter(account => account.name !== name),
    });
    // TODO: this doesn't seem to allow you to remove the last item?
    localStorage.setItem('octodash-accounts', JSON.stringify(this.state.accounts));

    return false;
  }

  render() {
    const { accounts } = this.state;
    return (
      <div className="position-relative js-header-wrapper ">
        <header className="Header  f5">
          <div className="d-flex flex-justify-between px-3 container-lg">
            <div className="HeaderMenu d-flex flex-justify-between flex-auto">
              <div className="d-flex"></div>
              <div className="d-flex">
                <ul className="user-nav d-flex flex-items-center list-style-none">
                  <li className="dropdown">
                    <details className="details-expanded details-reset js-dropdown-details d-flex px-2 flex-items-center">
                      <summary className="HeaderNavlink">
                        Personal Access Tokens <span className="dropdown-caret mt-1"></span>
                      </summary>
                      <div className="dropdown-menu dropdown-menu-sw show-more-popover text-gray-dark anim-scale-in" style={{width: "425px"}}>
                          {accounts.map(account => (
                            <div key={account.name} className="width-full inline-form js-comment-delete" >
                              <button className="dropdown-item menu-item-danger btn-link" onClick={() => this.handleDelete(account.name)}>
                                {account.name}
                              </button>
                            </div>
                          ))}
                          <label className="dropdown-item btn-link js-comment-edit-button">
                            Add: <input type="text" size="44" value={this.state.newTokenValue} onKeyPress={this.handleCreate} />
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
