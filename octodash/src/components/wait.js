import Base from './base';

class Wait extends Base {
  constructor(props) {
    super(props);
    const accounts = JSON.parse(localStorage.getItem('octodash-accounts')) || [];
    this.queries = accounts.map(account => `is:open is:issue archived:false -assignee:${account.name} author:${account.name}&access_token=${account.token}`);
    this.queries = this.queries.concat(accounts.map(account => `is:open is:issue archived:false -assignee:${account.name} -author:${account.name} commenter:${account.name}&access_token=${account.token}`));
    this.queries = this.queries.concat(accounts.map(account => `is:open is:pr archived:false -assignee:${account.name} -author:${account.name} commenter:${account.name}&access_token=${account.token}`));
    this.queries = this.queries.concat(accounts.map(account => `is:open is:pr archived:false author:${account.name}&access_token=${account.token}`));
  }
}

export default Wait;
