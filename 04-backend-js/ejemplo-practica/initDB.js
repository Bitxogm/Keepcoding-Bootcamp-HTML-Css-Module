import readline from 'node:readline/promises';

import { connectMongoose } from './lib/connectMongoose.js';
import { Product, User } from './models/index.js';

const connection = await connectMongoose();
console.log(`Connected to MongoDB: ${connection.name}`);

// Check de seguridad
const answer = await ask('Estas seguro que deseas eliminar toda la información de la base de datos? [y/N] ');
if (answer.toLowerCase() !== 'y') {
    console.log('Script abortado');
    process.exit(0);
}

await seedUsers();
await seedProducts();

await connection.close();
process.exit(0);

async function seedUsers() {

    const USERS = [
        { email: 'user@example.com', password: await User.hashPassword('1234') },
        { email: 'admin@example.com', password: await User.hashPassword('1234') }
    ];

    // Delete all users
    const deleteResult = await User.deleteMany();
    console.log(`Deleted ${deleteResult.deletedCount} Users`);

    const insertResult = await User.insertMany(USERS);

    console.log(`Inserted ${insertResult.length} Users`);

}

async function seedProducts() {

    // Delete all products
    const deleteResult = await Product.deleteMany();
    console.log(`Deleted ${deleteResult.deletedCount} Products`);

    const [user, admin] = await Promise.all([
        User.findOne({ email: 'user@example.com' }),
        User.findOne({ email: 'admin@example.com' })
    ]);

    // Minimum 15 products by user
     const PRODUCTS = [
        { name: 'Iphone 17 pro', price: 870, owner: user._id, tags: ['mobile', 'lifestyle'] },
        { name: 'Samsung Galaxy 50', price: 650, owner: user._id, tags: ['mobile', 'lifestyle'] },
        { name: 'Xiaomi Mi 14', price: 450, owner: user._id, tags: ['mobile', 'lifestyle'] },
        { name: 'Macbook Pro 2030', price: 2300, owner: admin._id, tags: ['laptop', 'work'] },
        { name: 'Dell XPS 50', price: 1800, owner: admin._id, tags: ['laptop', 'work'] },
        { name: 'Asus Zenbook 40', price: 1200, owner: admin._id, tags: ['laptop', 'work'] },
        { name: 'iPad Pro 15', price: 1100, owner: user._id, tags: ['tablet', 'lifestyle'] },
        { name: 'Samsung Tab S10', price: 900, owner: user._id, tags: ['tablet', 'lifestyle'] },
        { name: 'Amazon Fire 12', price: 300, owner: user._id, tags: ['tablet', 'lifestyle'] },
        { name: 'Sony WH-1000XM5', price: 400, owner: admin._id, tags: ['audio', 'accessory'] },
        { name: 'Bose QuietComfort 55', price: 350, owner: admin._id, tags: ['audio', 'accessory'] },
        { name: 'Apple AirPods Pro 3', price: 250, owner: admin._id, tags: ['audio', 'accessory'] },
        { name: 'Fitbit Charge 10', price: 150, owner: user._id, tags: ['wearable', 'fitness'] },
        { name: 'Garmin Vivosmart 5', price: 130, owner: user._id, tags: ['wearable', 'fitness'] },
        { name: 'Apple Watch Series 10', price: 500, owner: user._id, tags: ['wearable', 'fitness'] },
        { name: 'Canon EOS R5', price: 3900, owner: admin._id, tags: ['camera', 'photography'] },
        { name: 'Nikon Z9', price: 4500, owner: admin._id, tags: ['camera', 'photography'] },
        { name: 'Sony A7 IV', price: 2800, owner: admin._id, tags: ['camera', 'photography'] },
        { name: 'GoPro HERO12', price: 500, owner: user._id, tags: ['camera', 'action'] },
        { name: 'DJI Mavic 4', price: 1500, owner: user._id, tags: ['drone', 'photography'] },
        { name: 'Razer Blade 18', price: 3500, owner: admin._id, tags: ['laptop', 'gaming'] },
        { name: 'Alienware x17 R3', price: 3200, owner: admin._id, tags: ['laptop', 'gaming'] },
        { name: 'Asus ROG Zephyrus G14', price: 2200, owner: admin._id, tags: ['laptop', 'gaming'] },
    ];

    const insertResult = await Product.insertMany(PRODUCTS);

    console.log(`Inserted ${insertResult.length} Products`);

}

// Función para preguntar por consola
async function ask(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const result = await rl.question(question);
    rl.close();
    return result;
}