// Utils


const utils = {
  /**
   *
   * @param dateTimeStamp<String>
   * @returns {*}<String>
   */
  getDateDiff: dateTimeStamp => {
    let minute = 1000 * 60, hour = minute * 60, day = hour * 24, halfamonth = day * 15, month = day * 30
    let now = new Date().getTime()
    let diffValue = now - Date.parse(dateTimeStamp)
    if (diffValue < 0) return
    let monthC = diffValue / month, weekC = diffValue / (7 * day), dayC = diffValue / day, hourC =diffValue/hour, minC = diffValue / minute
    if (monthC >= 1) result = '' + parseInt(monthC) + '月前'
    else if (weekC >= 1) result = '' + parseInt(weekC) + '周前'
    else if (dayC >= 1) result = '' + parseInt(dayC) + '天前'
    else if (hourC >= 1) result = '' + parseInt(hourC) + '小时前'
    else if (minC >= 1) result = '' + parseInt(minC) + '分钟前'
    else result = '刚刚'
    return result
  },

  getTimelineDate: dateTimeStr => {
    let stdTime = new Date(Date.parse(dateTimeStr)),
      year = stdTime.getFullYear(),
      month = parseInt(stdTime.getMonth()) + 1,
      date = stdTime.getDate()
    let currentTime = new Date()
    let currentYear = currentTime.getFullYear()

    return {
      year: parseInt(year),
      month: parseInt(month),
      date: parseInt(date),
      curYear: parseInt(currentYear)
    }
  },

  getTimeStamp: () => Date.parse(new Date()),

  convertJobExperience: (lower, upper) => {
    if (lower === -1 && upper === -1) return '无'
    else if (lower === -1 && upper !== -1) return `${upper}年以下经验`
    else if (lower !== -1 && upper === -1) return `${lower}年以上经验`
    else if (lower === upper) return `${upper}年经验`
    else return `${lower}-${upper}年经验`
  },

  convertJobSalary: (lower, upper) => {
    if (lower === -1 && upper === -1) return '薪资面议'
    else if (lower === -1 && upper !== -1) return `${upper}k以下`
    else if (lower !== -1 && upper === -1) return `${lower}k以上`
    else if (lower === upper) return `${upper}k`
    else return `${lower}-${upper}k`
  },

}

export default utils