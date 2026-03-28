import readline from 'node:readline/promises';

import { connectMongoose } from './lib/connectMongoose.js';
import { Agent } from './models/Agent.js';
import { User } from './models/User.js';

const connection = await connectMongoose();
console.log(`Connected to MongoDB: ${connection.name}`);

// Check de seguridad
const answer = await ask('Estas seguro que deseas eliminar toda la información de la base de datos? [y/N] ');
if (answer.toLowerCase() !== 'y') {
    console.log('Script abortado');
    process.exit(0);
}

await seedUsers();
await seedAgents();

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

// TODO: Crea una función para inicializar los agentes.
// Los dos primeros senrán propiedad de admin y el tercero de user.
async function seedAgents() {

    // Delete all agents
    const deleteResult = await Agent.deleteMany();
    console.log(`Deleted ${deleteResult.deletedCount} Agents`);

    const [user, admin] = await Promise.all([
        User.findOne({ email: 'user@example.com' }),
        User.findOne({ email: 'admin@example.com' })
    ]);

     const AGENTS = [
        { name: 'Smith', age: 45, owner: admin._id },
        { name: 'Brown', age: 33, owner: admin._id },
        { name: 'Jones', age: 24, owner: user._id },
    ];

    const insertResult = await Agent.insertMany(AGENTS);

    console.log(`Inserted ${insertResult.length} Agents`);

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