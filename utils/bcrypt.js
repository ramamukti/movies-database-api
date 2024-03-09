import bcrypt from 'bcrypt';

const hashPassword = (plainPassword) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(plainPassword, salt);
    return hashedPassword;
} 

const comparePassword = (plainPassword, hashedPassword) => {
    const validPassword = bcrypt.compare(plainPassword, hashedPassword);
    return validPassword;
}

export {hashPassword, comparePassword};