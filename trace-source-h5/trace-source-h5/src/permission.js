import router from './router';

router.beforeEach(async (to, from, next) => {
    console.log('to');
    console.log(to);
    
});

router.afterEach(() => {

});
