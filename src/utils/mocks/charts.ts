
const today = new Date();


export  const dataset = {
            dates: [
            new Date(today.getFullYear(), 0, 5),
            new Date(today.getFullYear(), 0, 15),
            new Date(today.getFullYear(), 1, 2),
            new Date(today.getFullYear(), 2, 4),
            new Date(today.getFullYear(), 2, 25),
            new Date(today.getFullYear(), 3, 12),
            new Date(today.getFullYear(), 4, 7),
            new Date(today.getFullYear(), 4, 22),
            new Date(today.getFullYear(), 5, 30),
            new Date(today.getFullYear(), 6, 10),
            new Date(today.getFullYear(), 7, 14),
            new Date(today.getFullYear(), 7, 29),
            new Date(today.getFullYear(), 8, 3),
            new Date(today.getFullYear(), 9, 1),
            new Date(today.getFullYear(), 9, 22),
            new Date(today.getFullYear(), 10, 15),
            new Date(today.getFullYear(), 11, 5),
            new Date(today.getFullYear(), 11, 20),
            ],
            paid: {
                prices: [
                    38000, 42000, 50000, 60000, 75000, 90000, 85000, 92000, 70000, 60000,
                    68000, 72000, 88000, 93000, 97000, 85000, 72000, 65000,
                ],
            },
            unpaid: {
                prices: [
                    8000, 10000, 12000, 16000, 20000, 15000, 17000, 21000, 25000, 30000,
                    22000, 18000, 15000, 12000, 10000, 9000, 6000, 4000,
                ],
            },
            maximumPrice: 100000,
};