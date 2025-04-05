// مفتاح الـ API الخاص بك
const apiKey = 'd499bc3ab3aac9a6f7b6f4a3603da970';
// تحديد رابط الـ API الخاص بـ API Sports
const url = 'https://api.football-api-sports.io/matches';

// إرسال طلب باستخدام fetch
fetch(`${url}?league=88&date=today`, {
  method: 'GET',
  headers: {
    'x-apisports-key': apiKey,
    'Content-Type': 'application/json',
  },
})
  .then(response => {
    if (!response.ok) {
      throw new Error('حدث خطأ في جلب البيانات');
    }
    return response.json();
  })
  .then(data => {
    const matches = data.response;  // البيانات المسترجعة
    if (matches.length === 0) {
      console.log('لا توجد مباريات اليوم');
    } else {
      matches.forEach(match => {
        console.log(`المباراة: ${match.teams.home.name} ضد ${match.teams.away.name}`);
        console.log(`الوقت: ${new Date(match.fixture.date).toLocaleString()}`);
        console.log(`الاستاد: ${match.fixture.venue.name}`);
        console.log('-----------------------');
      });
    }
  })
  .catch(error => {
    console.error('حدث خطأ:', error);
  });
