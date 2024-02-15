import UserRepository from '../repositories/user/UserRepository';

export const userRepository: UserRepository = new UserRepository();
export default () => {
    userRepository.count()
        .then(res => {
            console.log('res', typeof res, res);

            if (res === 0) {
                console.log('Data seeding in progress');
                userRepository.create({
                    name: 'Aman Verma',
                    email: 'aman@gmail.com',
                    phoneNumber: '9876543210',
                });

            }

        }).catch(err => console.log(err));
};
