module.exports = {
    payment_data: [
        {
            provider_name: "Viettel",
            value: {
                data: [
                    { money: "10.000 VND", chip: "100.000 Chips", bonus: "1%" },
                    { money: "20.000 VND", chip: "200.000 Chips", bonus: "2%" },
                    { money: "30.000 VND", chip: "300.000 Chips", bonus: "3%" },
                    { money: "50.000 VND", chip: "500.000 Chips", bonus: "5%" },
                    { money: "100.000 VND", chip: "1.000.000 Chips", bonus: "10%" },
                    { money: "200.000 VND", chip: "2.000.000 Chips", bonus: "20%" },
                    { money: "500.000 VND", chip: "5.000.000 Chips", bonus: "50%" }
                ]
            }
        },
        {
            provider_name: "Mobifone",
            value: {
                data: [
                    { money: "10.000 VND", chip: "500.000 Chips", bonus: "0%" },
                    { money: "20.000 VND", chip: "1.200.000 Chips", bonus: "+20%" },
                    { money: "30.000 VND", chip: "2.250.000 Chips", bonus: "+50%" },
                    { money: "50.000 VND", chip: "5.000.000 Chips", bonus: "+100%" },
                    {
                        money: "100.000 VND",
                        chip: "14.000.000 Chips",
                        bonus: "+180%"
                    },
                    {
                        money: "200.000 VND",
                        chip: "45.000.000 Chips",
                        bonus: "+350%"
                    },
                    {
                        money: "300.000 VND",
                        chip: "97.000.000 Chips",
                        bonus: "+550%"
                    },
                    {
                        money: "500.000 VND",
                        chip: "200.000.000 Chips",
                        bonus: "+700%"
                    }
                ]
            }
        },
        {
            provider_name: "Vinaphone",
            value: {
                data: [
                    { money: 31, chip: 31, bonus: 31 },
                    { money: 32, chip: 32, bonus: 32 },
                    { money: 33, chip: 33, bonus: 33 }
                ]
            }
        },
        {
            provider_name: "Gate",
            value: {
                data: [
                    { money: 41, chip: 41, bonus: 41 },
                    { money: 42, chip: 42, bonus: 42 },
                    { money: 43, chip: 43, bonus: 43 }
                ]
            }
        }
    ]
}