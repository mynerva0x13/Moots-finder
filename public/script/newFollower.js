function getWeekNumber(date) {
  const target = new Date(date);
  const start = new Date(target.getFullYear(), 0, 1);
  const dayOfYear = ((target - start + 86400000) / 86400000);
  return { year: target.getFullYear(), week: Math.ceil(dayOfYear / 7) };
}

function getNewFollowercount(data) {
  const weeklyCounts = data.followers.reduce((acc, follower) => {
    const { year, week } = getWeekNumber(follower.createdAt);
    const key = `${year}-W${week}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Step 2: Sort weeks chronologically
  const sortedWeeks = Object.keys(weeklyCounts).sort();

  // Step 3: Compare with previous week and assign status
  const weeklyData = sortedWeeks.map((week, index) => {
    const currentCount = weeklyCounts[week];
    const prevCount = index > 0 ? weeklyCounts[sortedWeeks[index - 1]] : 0;
    let status = "neutral";

    if (currentCount > prevCount) status = "green";
    else if (currentCount < prevCount) status = "red";

    return {
      week,
      count: currentCount,
      status,
    };
  });

  return weeklyData; // Return the result
}

