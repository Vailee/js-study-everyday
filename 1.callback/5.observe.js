// 观察者模式  观察者 被观察者
// 将所有的观察者都放到被观察者中 （基于发布订阅）
class Subject{ // 被观察者
  constructor(name) {
    this.name = name
    this.observers = []
    this.state='玩'
  }
  attach(o) { //被观察者中要存放所有的观察者
    this.observers.push(o)
  }
  setState(newState) {
    this.state = newState
    this.observers.forEach(o=>o.update(this))
  }
}
class Observer{ // 观察者
  constructor(name) {
    this.name=name
  }
  update(baby) {
    console.log(baby.name+'跟'+this.name+'说'+baby.state);
  }
}
let baby = new  Subject('小宝宝')
let o1 = new  Observer('爸爸')
let o2 = new Observer('妈妈')

baby.attach(o1)
baby.attach(o2)
baby.setState('被打了')