import Vue from 'vue';
import Router from 'vue-router';
import EmailVerification from '@/components/EmailVerification.vue';
import ContactUs from '@/components/ContactUs.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/verify',
            name: 'EmailVerification',
            component: EmailVerification
        },
        {
            path: '/contact-us',
            name: 'ContactUs',
            component: ContactUs
        },
        {
            path: '*',
            redirect: '/verify'
        }
    ]
});
