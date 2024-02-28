const locales = {
    "ru": {
        durationLabelsStandard: {
            S: 'милисекунда',
            SS: 'милисекунд',
            s: 'секунда',
            ss: 'секунд',
            m: 'минута',
            mm: 'минут',
            h: 'час',
            hh: 'часов',
            d: 'день',
            dd: 'дней',
            w: 'неделя',
            ww: 'неднли',
            M: 'месяц',
            MM: 'месяцев',
            y: 'год',
            yy: 'лет'
        },
        durationLabelsShort: {
            S: 'мс',
            SS: 'мс',
            s: 'c',
            ss: 'c',
            m: 'мин',
            mm: 'мин',
            h: 'ч',
            hh: 'ч',
            d: 'д',
            dd: 'д',
            w: 'н',
            ww: 'н',
            M: 'мес',
            MM: 'мес',
            y: 'г',
            yy: 'л'
        },
        durationLabelTypes: [
            { type: "standard", string: "__" },
            { type: "short", string: "_" }
        ],
        durationPluralKey: function (token, integerValue, decimalValue) {
            if (integerValue === 1 && decimalValue === null) {
                return token;
            }

            return token + token;
        }
    }
}

export default setCustomLocales = (moment) => {
    for (const lng in locales) {
        if (locales.hasOwnProperty(lng)) {
            const localization = locales[lng];
            moment.updateLocale(lng, localization);
        }
    }
}