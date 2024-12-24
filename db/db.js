const Ticket = require("../models/ticket");

class MyDb {
  constructor() {
    this.tickets = [];
  }

  /**
   * create and save a new ticket
   * @param {string} username
   * @param {number} price
   * @returns {Ticket} //return a ticket object
   */
  create(username, price) {
    const ticket = new Ticket(username, price);
    this.tickets.push(ticket);
    return ticket;
  }
  // sell multiple tickets
  /**
   * create multiple ticket for  single user
   * @param {string}username
   * @param {number} price
   * @param {number} quantity
   * @returns {Array<Ticket>}
   */
  bulkCreate(username, price, quantity) {
    const result = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = this.create(username, price);
      result.push(ticket);
    }
    return result;
  }
  /**
   * return all availabale tickets
   *
   */
  find() {
    return this.tickets;
  }
  /**
   * find ticket by ticket id
   * @param {string} ticketId
   */
  findByID(ticketId) {
    const ticket = this.tickets.find(
      /**
       *
       * @param {string} ticketId
       * @returns {Ticket}
       */
      (ticket) => ticket.id === ticketId
    );
    return ticket;
  }
  /**
   *
   * @param {string} username
   * @returns  {Array<Ticket>}
   */
  findByUserName(username) {
    const tickets = this.tickets.filter(
      /**
       * @param {Ticket}ticket
       */
      (ticket) => ticket.username === username
    );
    return tickets;
  }
  /**
   *
   * @param {string} ticketId
   * @param {{username:string,price:number}} ticketBody
   * @returns {Ticket}
   */
  updateById(ticketId, ticketBody) {
    const ticket = this.findByID(ticketId);
    ticket.username = ticketBody.username ?? ticket.username;
    ticket.price = ticketBody.price ?? ticket.price;
    ticket.updatedAt = new Date();
    return ticket;
  }
  /**
   * delete ticket id
   * @param {string} ticketId
   */
  deleteById(ticketId) {
    const index = this.tickets.findIndex((ticket) => ticket.id === ticketId);
    if (index !== -1) {
      this.tickets.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
  /**
   * find winners
   * @param {number} winnerCount
   * @returns {Array<Ticket>}
   */
  draw(winnerCount) {
    let winnerIndexes = new Array(winnerCount);
    let index = 0;
    while (index < winnerCount) {
      let winnerIndex = Math.floor(Math.random() * this.tickets.length);
      console.log("Winner Index", winnerIndex);
      if (!winnerIndexes.includes(winnerIndex)) {
        winnerIndexes[index++] = winnerIndex;
        continue;
      }
    }
    
    const winners = winnerIndexes.map((index) => this.tickets[index]);
    return winners;
  }
}

const myDb = new MyDb();
module.exports = myDb;
