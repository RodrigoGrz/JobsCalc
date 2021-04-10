const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
        res.render("profile", { profile: Profile.get() })
    },

    update(req, res) {
        // req.body para pegar os dados
        const data = req.body

        // definir quantas semana tem em um ano: 52
        const weeksPerYear = 52

        // remover as semanas de ferias do ano, para pegars qnts semanas tem em um mes
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

        // total de horas trabalhadas na semana 
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

        // horas trabalhadas no mês
        const monthlyTotalHours = weekTotalHours + weeksPerMonth

        // qual será o valor da minha hora?
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        Profile.update({
            ...Profile.get(),
            ...req.body,
            "value-hour": valueHour
        }) 

        return res.redirect('/profile')
    }
}