// Pages
import { Registration } from '../pages/registration';
import { Login } from '../pages/login';
import { Profile } from '../pages/profile';
import { Dashboard } from '../pages/dashboard';
import { Breakfast } from '../pages/breakfast';
import { Coffee } from '../pages/coffee';
import { Dinner } from '../pages/dinner';
import { Fruits } from '../pages/fruits';
import { Junk } from '../pages/junk';
import { Lunch } from '../pages/lunch';
import { Sleep } from '../pages/sleep';
import { Steps } from '../pages/steps';
import { Vegetables } from '../pages/vegetables';
import { Water } from '../pages/water';

const base = '/';

export const book = Object.freeze({
    root: {
        url:  `${base}`,
        page: Dashboard,
    },
    login: {
        url:  `${base}login`,
        page: Login,
    },
    registration: {
        url:  `${base}registration`,
        page: Registration,
    },
    profile: {
        url:  `${base}profile`,
        page: Profile,
    },
    breakfast: {
        url:  `${base}breakfast`,
        page: Breakfast,
    },
    coffee: {
        url:  `${base}coffee`,
        page: Coffee,
    },
    dinner: {
        url:  `${base}dinner`,
        page: Dinner,
    },
    fruits: {
        url:  `${base}fruits`,
        page: Fruits,
    },
    junk: {
        url:  `${base}junk`,
        page: Junk,
    },
    lunch: {
        url:  `${base}lunch`,
        page: Lunch,
    },
    sleep: {
        url:  `${base}sleep`,
        page: Sleep,
    },
    steps: {
        url:  `${base}steps`,
        page: Steps,
    },
    vegetables: {
        url:  `${base}vegetables`,
        page: Vegetables,
    },
    water: {
        url:  `${base}water`,
        page: Water,
    },
});

export type BookType = typeof book;
