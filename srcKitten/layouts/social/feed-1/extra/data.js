import { ImageSourcePropType } from 'react-native';

export class Training {

    constructor(title, description, photo, time, styx) {
        this.title = title;
        this.description = description;
        this.photo = photo;
        this.time = time;
        this.styx = styx;
    }

    static basketball() {
        return new Training(
            'Basketball',
            'Team sport in which two teams, most commonly of five players.',
            require('../assets/image-training-1.jpg'),
            16,
            55,
        );
    }

    static running() {
        return new Training(
            'Running',
            'Great way to get fit and even form new relationships with other runners.',
            require('../assets/image-training-2.jpg'),
            2,
            55,
        );
    }

    static workout() {
        return new Training(
            'Basketball',
            'Workout of the Week: STYX! Our Ultimate cardio pyramid.',
            require('../assets/image-training-3.jpg'),
            16,
            55,
        );
    }
}
