export class UserModel {
    PPS: string = '';
    cell: string = '';
    dob: number = 0;
    email: string = '';
    gender: string = '';
    location: LocationModel = new LocationModel();
    name: NameModel = new NameModel();
    password:  string = '';
    phone:  string = '';
    registered: number = 0;
    salt: string = '';
    sha1: string = '';
    sha256: string = '';
    username: string = '';
    picture: ProfilePicModel = new ProfilePicModel();
}

export class LocationModel {
    city: string = '';
    state: string = '';
    street: string = '';
    zip: number = 0;
}

export class NameModel {
    first: string = '';
    last: string = '';
    title: string = '';
}

export class ProfilePicModel {
    large:  string = '';
    medium:  string = '';
    thumbnail:  string = '';
}

export class UserListModel {
    user: UserModel = new UserModel;
}