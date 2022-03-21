// Core
import { FC } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

// Book
import { book, BookType } from '../../../../navigation/book';

// Hooks
import { useStore } from '../../../../hooks';

// Styles
import Styles from './styles/index.module.scss';

import { availableQuestions } from './availableQuestions';

export const DashboardComponent: FC = observer(() => {
    const { trackerStore } = useStore();
    const { score } = trackerStore;

    if (score === null) {
        return null;
    }

    const questionsJSX = availableQuestions.map(({ title, description, url }, index) => (
        <Link
            key = { String(index) } to = { book[ url as keyof BookType ].url }
            className = { cx([Styles.link, Styles[ `category${index}` ]]) }>
            <span className = { Styles.title }>{ title }</span>
            <span className = { Styles.description }>{ description }</span>
        </Link>
    ));

    return (
        <div className = { Styles.dashboard }>
            <div className = { Styles.navigation }>
                <h1>Как у тебя проходит день?</h1>
                <div className = { Styles.items }>
                    { questionsJSX }
                </div>
            </div>
        </div>
    );
});
