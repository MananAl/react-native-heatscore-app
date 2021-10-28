import { ImageSourcePropType } from 'react-native';

export class Product {

    constructor(title, subtitle, description, price, image, size, colors, comments) {
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.price = price;
        this.image = image;
        this.size = size;
        this.colors = colors;
        this.comments = comments;
    }

    static pinkChair() {
        return new Product(
            'Pink Chair',
            'Furniture',
            'The Vitra Plastic Side Chairs are undoubtedly an absolute classic when it comes to the living area. The unusual mix of a plastic seat shell and wooden frame has since become a source of inspiration for many designers.',
            '150$',
            require('../assets/image-product.png'),
            'H:80cm W:50cm D:40cm',
            [
                ProductColor.gray(),
                ProductColor.pink(),
                ProductColor.orange(),
            ],
            [
                Comment.byHubertFranck(),
            ],
        );
    }
}

export class ProductColor {
    constructor(value, description) {
        this.value = value;
        this.description = description;
    }

    static gray() {
        return new ProductColor('#3366FF', 'blue');
    }

    static pink() {
        return new ProductColor('#FF708D', 'pink');
    }

    static orange() {
        return new ProductColor('#FFC94D', 'orange');
    }
}

export class Profile {
    constructor(firstName, lastName, photo) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    static markVolter() {
        return new Profile(
            'Mark',
            'Volter',
            require('../assets/image-profile.jpg'),
        );
    }

    static hubertFranck() {
        return new Profile(
            'Hubert',
            'Franck',
            require('../assets/image-profile.jpg'),
        );
    }
}

export class Like {

    constructor(author) {
        this.author = author;
    }

    static byMarkVolter() {
        return new Like(
            Profile.markVolter(),
        );
    }

    static byHubertFranck() {
        return new Like(
            Profile.hubertFranck(),
        );
    }
}

export class Comment {
    constructor(text, date, author, comments, likes) {
        this.text = text;
        this.date = date;
        this.author = author;
        this.comments = comments;
        this.likes = likes;
    }

    static byHubertFranck() {
        return new Comment(
            'The chair has a good quality!',
            'Today 11:10 am',
            Profile.hubertFranck(),
            [
                Comment.byMarkVolter(),
            ],
            [
                Like.byMarkVolter(),
            ],
        );
    }

    static byMarkVolter() {
        return new Comment(
            'Yes! I agree with you',
            'Today 11:10 am',
            Profile.markVolter(),
            [],
            [],
        );
    }
}
