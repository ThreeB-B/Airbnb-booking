import React from 'react';
import moment from 'moment';
import Date from './Date.jsx';
import Cost from './Cost.jsx';
import Guest from './Guest.jsx';


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adults: 1,
      children: 0,
      infants: 0,
      adultMessage: '1 Guest',
      childrenMessage: '',
      infantMessage: '',
      guestSelected: false,
      guestExpand: false,
      totalCostPerNight: 0,
      totalCost: 0,
      calculatedTax: 0,
      selectedNights: 0,
      check_in: 0,
      check_out: 0,
      selectedDate: 0,
      check_in_clicked: false,
      check_out_clicked: false,
    };
    // this.increaseAdults = this.increaseAdults.bind(this);
    // this.increaseChildren = this.increaseChildren.bind(this);
    // this.increaseInfants = this.increaseInfants.bind(this);
    // this.decreaseAdults = this.decreaseAdults.bind(this);
    // this.decreaseChildren = this.decreaseChildren.bind(this);
    // this.decreaseInfants = this.decreaseInfants.bind(this);
    this.increaseGuest = this.increaseGuest.bind(this);
    this.decreaseGuest = this.decreaseGuest.bind(this);
    this.guestButtonMessage = this.guestButtonMessage.bind(this);
    this.guestSelectToggle = this.guestSelectToggle.bind(this);
    this.guestExpandToggle = this.guestExpandToggle.bind(this);
    this.calculateCostPerNight = this.calculateCostPerNight.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
    this.handleCheckinClicked = this.handleCheckinClicked.bind(this);
    this.handleCheckoutClicked = this.handleCheckoutClicked.bind(this);
    this.calendarInitialize = this.calendarInitialize.bind(this);
    this.updateTotalNights = this.updateTotalNights.bind(this);
  }

  onDayClick(e, dateContext, cb1, cb2) {
    if (this.state.check_in_clicked) {
      this.setState({
        check_in: dateContext.format('MM/DD/YYYY'),
      }, cb1());
    } else if (this.state.check_out_clicked) {
      this.setState({
        check_out: dateContext.format('MM/DD/YYYY'),
      }, cb2(), this.guestExpandToggle(e));
    }
  }

  guestButtonMessage() {
    if (this.state.adults === 1) {
      this.setState({
        adultMessage: '1 Guest',
      });
    } else {
      this.setState({
        adultMessage: `${this.state.adults} Guests`,
      });
    }

    if (this.state.children === 1) {
      this.setState({
        childrenMessage: ', 1 Child',
      });
    } else {
      this.setState({
        childrenMessage: `, ${this.state.children} Children`,
      });
    }

    if (this.state.infants === 1) {
      this.setState({
        infantMessage: ', 1 Infant',
      });
    } else {
      this.setState({
        infantMessage: `, ${this.state.infants} Infants`,
      });
    }
  }

  guestSelectToggle(e) {
    this.setState({
      guestSelected: true,
    }, this.calculateCostPerNight);
    e.preventDefault();
  }

  guestExpandToggle(e) {
    this.setState({
      guestExpand: !this.state.guestExpand,
      guestSelected: true,
    }, this.calculateCostPerNight);
    this.updateTotalNights();
    e.preventDefault();
  }

  calculateCostPerNight() {
    let cost = this.props.price + this.props.service_fee + this.props.cleaning_fee;
    let tax = cost * (this.props.tax / 100);
    tax = parseFloat(tax.toFixed(2));
    cost += tax;
    cost = parseFloat(cost.toFixed(2));
    const totalCost = cost * this.state.selectedNights;
    this.setState({
      totalCostPerNight: cost,
      calculatedTax: tax,
      totalCost,
    });
  }

  increaseGuest(e) {
    e.preventDefault(e);
    console.log(e.target.className)
    this.setState({
      [e.target.className]: this.state[e.target.className] + 1,
    }, this.guestButtonMessage);
  }

  decreaseGuest(e) {
    e.preventDefault(e);
    console.log(e.target.className)
    this.setState({
      [e.target.className]: this.state[e.target.className] - 1,
    }, this.guestButtonMessage);
  }

  // increaseAdults(e) {
  //   e.preventDefault();
  //   this.setState({
  //     adults: this.state.adults + 1,
  //   }, this.guestButtonMessage);
  // }

  // increaseChildren(e) {
  //   e.preventDefault();
  //   this.setState({
  //     children: this.state.children + 1,
  //   }, this.guestButtonMessage);
  // }

  // increaseInfants(e) {
  //   e.preventDefault();
  //   this.setState({
  //     infants: this.state.infants + 1,
  //   }, this.guestButtonMessage);
  // }

  // decreaseAdults(e) {
  //   e.preventDefault();
  //   this.setState({
  //     adults: this.state.adults - 1,
  //   }, this.guestButtonMessage);
  // }

  // decreaseChildren(e) {
  //   e.preventDefault();
  //   this.setState({
  //     children: this.state.children - 1,
  //   }, this.guestButtonMessage);
  // }

  // decreaseInfants(e) {
  //   e.preventDefault();
  //   this.setState({
  //     infants: this.state.infants - 1,
  //   }, this.guestButtonMessage);
  // }

  handleCheckinClicked() {
    this.setState({
      check_in_clicked: true,
      check_out_clicked: false,
    });
  }

  handleCheckoutClicked() {
    this.setState({
      check_out_clicked: true,
      check_in_clicked: false,
    });
  }

  updateTotalNights() {
    let nights = moment(this.state.check_out, 'MM/DD/YY') - moment(this.state.check_in, 'MM/DD/YY');
    nights = moment(nights).format('D');
    this.setState({
      selectedNights: nights,
    });
  }

  calendarInitialize() {
    this.setState({
      check_in: 0,
      check_out: 0,
    }, this.handleCheckinClicked());
  }

  render() {
    let message = this.state.adultMessage;

    if (this.state.children !== 0) {
      message += this.state.childrenMessage;
    }
    if (this.state.infants) {
      message += this.state.infantMessage;
    }
    return (
      <section>
        <form>
          <div>
            <Date
              check_in={this.state.check_in}
              check_out={this.state.check_out}
              onDayClick={this.onDayClick}
              bookedDates={this.props.bookedDates}
              handleCheckinClicked={this.handleCheckinClicked}
              handleCheckoutClicked={this.handleCheckoutClicked}
              check_in_clicked={this.state.check_in_clicked}
              check_out_clicked={this.state.check_out_clicked}
              calendarInitialize={this.calendarInitialize}
            />
            <Guest
              guest={this.props.guest}
              adults={this.state.adults}
              num_children={this.state.children}
              infants={this.state.infants}
              // increaseAdults={this.increaseAdults}
              // increaseChildren={this.increaseChildren}
              // increaseInfants={this.increaseInfants}
              increaseGuest={this.increaseGuest}
              decreaseGuest={this.decreaseGuest}
              // decreaseAdults={this.decreaseAdults}
              // decreaseChildren={this.decreaseChildren}
              // decreaseInfants={this.decreaseInfants}
              guestSelectToggle={this.guestSelectToggle}
              message={message}
              guestButtonMessage={this.guestButtonMessage}
              guestSelected={this.state.guestSelected}
              guestExpandToggle={this.guestExpandToggle}
              guestExpand={this.state.guestExpand}
              updateTotalNights={this.updateTotalNights}
            />
            {this.state.guestSelected && !this.state.guestExpand
              ? (
                <Cost
                  price={this.props.price}
                  cleaning_fee={this.props.cleaning_fee}
                  service_fee={this.props.service_fee}
                  tax={this.state.calculatedTax}
                  totalCost={this.state.totalCost}
                  selectedNights={this.state.selectedNights}
                />
              ) : null}
          </div>
        </form>
        <div className="bookbutton">
          <button className="book" type="button"><div>Book</div></button>
        </div>
      </section>

    );
  }
}

// Form.propTypes = {
//   guest: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   cleaning_fee: PropTypes.number.isRequired,
//   service_fee: PropTypes.number.isRequired,
//   tax: PropTypes.number.isRequired,
//   min_night: PropTypes.number.isRequired,
//   max_night: PropTypes.number.isRequired,
//   bookedDates: PropTypes.object.isRequired,
// };


export default Form;