
import { Subscription } from './subscription.model'

export class Customer {
    id: number = 0;
    name: string = '';
    email: string = '';
    phone: string = '';
    state: string = '';
    city: string = '';
    birthdate: string = '';
    subscriptions : Array<number> = []
    mysubscriptions : Array<Subscription> = []
}