import React, { Component } from 'react';
import Meta from "react-helmet";
import firebase from 'firebase';
import ReactFire from 'reactfire';
import reactMixin from 'react-mixin';
import window from 'app/adaptors/server/window';
import ScrollWrapper from 'app/components/scroll-wrapper';
import Hero from 'app/components/hero';
import Signup from 'app/components/signup';
import ContactBlockAuto from 'app/components/contact-block-auto';
import Footer from 'app/components/footer';
import AutoWhatwedo from 'app/components/auto-whatwedo';

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function handleInputChange(component, input) {
  return (event) => {
    const payload = Object.assign({}, component.state.payload);
    payload[input] = event.target.value;
    component.setState({ payload });
  };
}

function handleClick(component) {
  return (event) => {
    event.preventDefault();

    component.setState({ status: 'sending' });

    if (validateEmail(component.state.payload.email)) {
      component.firebaseRefs.signup.push(component.state.payload, (error) => {
        if (error) {
          component.setState({
            status: 'error',
            errorMessage: error,
          });
          return;
        }
        component.setState({ status: 'success' });
      });
    } else {
      component.setState({
        status: 'error',
        errorMessage: 'Invalid email address',
      });
    }
  };
}

const config = {
  apiKey: "AIzaSyDkme6lbAz0ITTeY463TR5J9XLn6XqK7hI",
  authDomain: "auto-book-2.firebaseapp.com",
  databaseURL: "https://auto-book-2.firebaseio.com",
  projectId: "auto-book-2",
  storageBucket: "auto-book-2.appspot.com",
  messagingSenderId: "415950089629"
};

firebase.initializeApp(config);

class HumanisingAutonomy extends Component {

  constructor(props) {
    super(props);

    this.state = {
      payload: {
        email: '',
        name: '',
        company: '',
      },
      status: 'ready',
      errorMessage: '',
    };
  }

  componentWillMount() {
    firebase.auth().signInAnonymously().catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

    this.firebaseRef = firebase.database().ref('signup');
    this.bindAsArray(this.firebaseRef, 'signup');
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  render() {
    const { page, documentScrollPosition, viewportDimensions, footer, studios, currentPage, isMobile, fixedHeight, scrollProgress } = this.props;
    const { payload, status, errorMessage } = this.state;

    let styles;
    if (documentScrollPosition > window.innerHeight + 100) {
      styles = { position: `relative` }
    }

    return (
      <div className="page-auto page-auto-humanising-autonomy">

        <Meta
          meta={[{
            name: 'robots',
            content: 'noindex'
          }]}
        />

        <div className="home-pinned-header-wrapper">
          <div className="home-pinned-header-inner" style={styles}>
            <ScrollWrapper
              component={
                <Hero
                  title={autoHumanisingAutonomyData.title}
                  transitionImage={true}
                  showDownIndicator={true}
                  eventLabel=''
                  fixedHeight={fixedHeight}
                  isMobile={isMobile}
                  scrollProgress={scrollProgress}
                  heroImage={true}
                />
              }
              documentScrollPosition={documentScrollPosition}
              viewportDimensions={viewportDimensions}
            />
          </div>
        </div>

        <div className="home-main-content-wrapper">

          <div className="work-whatwedo-wrapper">
            <div className="work-whatwedo">

              <div className="work-intro">
                <p>{autoHumanisingAutonomyData.intro}</p>
              </div>

            </div>
          </div>

          <div className="auto-book-form">
            <div className="auto-book-content-inner">

              <div className="auto-book-form-wrapper">
                <p>Humanising Autonomy: Where Are We Going? is out now – get your free copy now:</p>
                <Signup
                  onNameInput={handleInputChange(this, 'name')}
                  onCompanyInput={handleInputChange(this, 'company')}
                  onEmailInput={handleInputChange(this, 'email')}
                  onSubmit={handleClick(this)}
                  payload={payload}
                  status={status}
                  errorMessage={errorMessage}
                />
              </div>

            </div>
          </div>

          <div className="work-whatwedo-wrapper">
            <div className="work-whatwedo">

              <div className="work-intro">

                <p>With AVs, there’s a tantalising opportunity to start-a-new. We can finally scrap legacy inefficiencies, skeuomorphic over-dependencies and redundant features.</p>

                <p>Looking beyond these opportunities to optimize, ustwo’s AV concept is the built on the foundational idea that there’s more to people’s mobility needs than simply the vehicle and its technology. We hope this illustration serves as a provocation, that contributes constructive conversation about the future.</p>

              </div>
              
            </div>
          </div>

          <ScrollWrapper
            component={<ContactBlockAuto />}
            documentScrollPosition={documentScrollPosition}
            viewportDimensions={viewportDimensions}
            requireScreenPosition={true}
            className="scroll-wrapper-contact-block"
          />
          <Footer data={footer} studios={studios} currentPage={currentPage}/>

        </div>
      </div>
    )
  }
}

reactMixin(HumanisingAutonomy.prototype, ReactFire);

export default HumanisingAutonomy;

const autoHumanisingAutonomyData = {
  title: 'Auto',
  subtitle: 'Humanising Autonomy',
  intro: "The auto industry's approach to autonomy is imbalanced – there is too much focus on discrete technologies, with little regard for the powerful human factors involved. In our latest book, we explore creating a human approach to autonomy that actually works."
}