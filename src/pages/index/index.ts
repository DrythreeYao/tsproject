import './index.scss'
import config from '../../../src/core/ts/config'
import { Person } from './Person'

let p = new Person('test')
p.sayHello()

let env = config.getEvn()

console.log(env)
