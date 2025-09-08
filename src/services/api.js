// // services/api.js

// // Un petit délai pour simuler la latence réseau
// const delay = ms => new Promise(res => setTimeout(res, ms));

// let fakePatients = [
//   { id: 1, name: 'Jean Rakoto', phone: '0341234567', password: '1234' },
// ];

// // Simulation API
// export const api = {
//   register: async (name, phone, password) => {
//     await delay(1000); // simule 1s de réseau
//     const newPatient = { id: Date.now(), name, phone, password };
//     fakePatients.push(newPatient);
//     return { success: true, patient: newPatient };
//   },

//   login: async (phone, password) => {
//     await delay(1000);
//     const patient = fakePatients.find(
//       p => p.phone === phone && p.password === password,
//     );
//     if (patient) {
//       return { success: true, patient };
//     } else {
//       return { success: false, message: 'Numéro ou mot de passe incorrect' };
//     }
//   },

//   getCenters: async () => {
//     await delay(800);
//     return [
//       { id: 1, name: 'CSB II Analamahitsy', lat: -18.8792, lng: 47.5079 },
//       { id: 2, name: 'Hôpital HJRA', lat: -18.9065, lng: 47.5166 },
//     ];
//   },

//   getAppointments: async patientId => {
//     await delay(800);
//     return [
//       { id: 1, date: '2025-09-10 10:00', center: 'HJRA', doctor: 'Dr Rabe' },
//     ];
//   },

//   getPrescriptions: async patientId => {
//     await delay(800);
//     return [
//       {
//         id: 1,
//         content: 'Paracétamol 500mg x 3/j',
//         doctor: 'Dr Raso',
//         date: '2025-09-07',
//       },
//     ];
//   },
// };

// ---------------------------------------------

// services/api.js

const delay = ms => new Promise(res => setTimeout(res, ms));

let fakePatients = [
  { id: 1, name: 'Jean Rakoto', phone: '0341234567', password: '1234' },
];

export const api = {
  register: async (name, phone, password) => {
    await delay(1000);
    const newPatient = { id: Date.now(), name, phone, password };
    fakePatients.push(newPatient);
    return { success: true, patient: newPatient };
  },

  login: async (phone, password) => {
    await delay(1000);
    const patient = fakePatients.find(
      p => p.phone === phone && p.password === password,
    );
    if (patient) {
      return { success: true, patient };
    } else {
      return { success: false, message: 'Numéro ou mot de passe incorrect' };
    }
  },
};
