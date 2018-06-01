import Base from './base';

class Todo extends Base {
  constructor(props) {
    super(props);
    const accounts = JSON.parse(localStorage.getItem('octodash-accounts')) || [];
    this.queries = accounts.map(account => `is:open is:issue archived:false assignee:${account.name}&access_token=${account.token}`);
    this.queries = this.queries.concat(accounts.map(account => `is:open is:issue archived:false -assignee:${account.name} -author:${account.name} mentions:${account.name}&access_token=${account.token}`));
    this.queries = this.queries.concat(accounts.map(account => `is:open is:pr archived:false assignee:${account.name}&access_token=${account.token}`));
    this.queries = this.queries.concat(accounts.map(account => `is:open is:pr archived:false review-requested:${account.name}&access_token=${account.token}`));
  }
}

export default Todo;
