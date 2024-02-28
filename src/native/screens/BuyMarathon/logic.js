import React, { Component, View } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getMarathon, getExercises } from '../../../actions/courses';
import { setPlansModalOptions } from '../../../actions/plans';
import isLoading from '../../../hocs/isLoading';
import { startCourse } from '../../../actions/courses';
import { withNamespaces } from 'react-i18next';
import { DefaultPubSubContext } from '../../utils/pubsub';
import { Actions } from 'react-native-router-flux';

export default (WrappedComponent) => {
  class Logic extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        course: {},
        exercises: [],
      };
    }

    static contextType = DefaultPubSubContext;

    updateCourse = async () => {
      // console.log('UPDATE CHALLENGE');
      this.setState({ loading: true });
      const { navigation, dispatch } = this.props;
      const { exercises } = await dispatch(
        getExercises(navigation.state.params._id)
      );
      const { course } = await dispatch(
        getMarathon(navigation.state.params._id, { populate: true })
      );
      this.setState({ exercises, course, loading: false });
    };

    componentDidMount() {
      const { navigation, dispatch } = this.props;
      const { subscribe } = this.context;
      this.updateCourse();
      subscribe('purchaseFinished', this.updateCourse);
      // dispatch(getMarathon(navigation.state.params._id))
    }

    componentWillUnmount() {
      const { unsubscribe } = this.context;
      unsubscribe('purchaseFinished', this.updateCourse);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
      const { navigation, dispatch } = this.props;
      const { navigation: prevNavigation } = prevProps;
      if (navigation.state.params._id !== prevNavigation.state.params._id) {
        this.updateCourse();
      }
    }

    _buyCourse = () =>
      new Promise(async (resolve) => {
        // console.log('BUY CHALLENGE 1');
        let { navigation, dispatch } = this.props;
        // console.log('BUY CHALLENGE 2');
        let { course } = this.state;
        // console.log('BUY CHALLENGE 3');
        // console.log('course ', course.attachedPlans);

        if (course.allowed || course.startAllowed || course.startTrialAllowed) {
          dispatch(startCourse(navigation.state.params._id))
            // .then(this.goToFirstLesson)
            .then(() =>
              //   Actions.marathonMain({ _id: navigation.state.params._id })
              Actions.replace('marathonMain', {
                _id: navigation.state.params._id,
              })
            );
        } else if (course.attachedPlans) {
          Actions.offers({ offers: course.attachedPlans });
        }

        // new Promise(resolve => {
        // const { navigation, dispatch } = this.props
        // dispatch(startCourse(navigation.state.params._id)).then(resolve)
        // })
      });
    render() {
      const { navigation, me } = this.props;
      let pi = null;
      if (me && me.purchasedItems) {
        pi = me.purchasedItems.find((pi) => {
          return pi._id == navigation.state.params._id;
        });
      }

      return (
        <WrappedComponent
          pi={pi}
          _buyCourse={this._buyCourse}
          {...this.props}
        />
      );
    }
  }

  return compose(
    withNamespaces(['app_courses'], { wait: true }),
    isLoading({
      status_path: ({ status }) => ({ status: status.marathon }),
    }),
    connect(({ course, marathon, me, influencer }) => ({
      course,
      marathon,
      me,
      influencer,
    }))
  )(Logic);
};
