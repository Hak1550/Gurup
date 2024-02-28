export default {
  me: {},
  welcomeScreen: {
    screen: 2
  },
  courses: [],
  course: {},
  nutritionMenus: [],
  nutritionMenu: {},
  nutritionRecipes: [],
  nutritionRecipe: {},
  purchasedCourses: [],
  exercises: [],
  exercise: {
    questions: []
  },
  quiz: { index: 0, score: 0 },
  chats: [],
  chat: {
    messages: [],
    info: {},
    prevPagesLoaded: 1,
  },
  status: {
    me: "initial",
    courses: "initial",
    course: "initial",
    exercise: "initial",
    exercises: "initial",
    chat: "initial",
    plans: "initial",
    tags: "initial",
    nutritionMenus: "initial",
    nutritionRecipes: "initial",
    marathons: "initial",
    marathon: "initial",
    articles: "initial",
    purchasedCourses: 'initial',
    influencer: "initial",
    plan: "initial",
  },
  plansModal: {
    isOpen: false
  },
  tags: [],
  influencer: null,
  influencerOnline: { online: false },
  animation: {},
  tmp: {
    marathonActiveDate: Date.now()
  }
};
