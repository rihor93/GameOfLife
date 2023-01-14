// Задание первого уровня 2
// Есть объединение (юнион) типов заказов в различных состояниях
// Нужно заменить FIXME на тип который достанет из Order все возможные состояния (state)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type alexPick<T, K extends keyof T> = T[K]
type StateProperties<T> = T extends Order ? alexPick<Order, "state"> : never;
type FIXME = StateProperties<Order>;

type Order =
  | {
    state: "initial";
    sum: number;
  }
  | {
    state: "inWork";
    sum: number;
    workerId: number;
  }
  | {
    state: "buyingSupplies";
    sum: number;
    workerId: number;
    suppliesSum: number;
  }
  | {
    state: "producing";
    sum: number;
    workerId: number;
    suppliesSum: number;
    produceEstimate: Date;
  }
  | {
    state: "fullfilled";
    sum: number;
    workerId: number;
    suppliesSum: number;
    produceEstimate: Date;
    fullfillmentDate: Date;
  };


type T40 = StateProperties<Order>;
type alexTest = "initial" | "inWork" | "buyingSupplies" | "producing" | "fullfilled"
export const getOrderState = (order: Order): FIXME => order.state;
