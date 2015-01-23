<project>
  <h3>{ opts.Name }</h3>

  <ul>
    <li each={ item, i in items }>{ item }</li>
  </ul>

  <form onsubmit={ add }>
    <input>
    <button>Add #{ items.length + 1 }</button>
  </form>

  // logic
  this.items = []

  add(e) {
    var input = e.target[0]
    this.items.push(input.value)
    input.value = ''
  }

</project>