// リファクタリングタスク: 関数の抽出を行ってください

function formatUserProfile(user) {
    checkUser(user);

    let firstName = '';
    let lastName = '';

    formatName(user);
    
    const formattedEmail = lowerCaseEmail(user);

    const ageGroup = setAgeGroup(user);

    const now = new Date();
    const registrationDate = registrateDate(now);
    const registrationTime = registrateTime(now);

    return createProfile();

    

    function checkUser(user) {
        if (!user.name || user.name.trim() === '') {
            throw new Error('ユーザー名が必須です');
        }
        if (!user.email || !user.email.includes('@')) {
            throw new Error('有効なメールアドレスが必要です');
        }
        if (user.age && (user.age < 0 || user.age > 150)) {
            throw new Error('年齢は0〜150の範囲である必要があります');
        }
    }

    function formatName (user) {
        const nameParts = user.name.trim().split(' ');
        if (nameParts.length === 1) {
            firstName = nameParts[0];
            lastName = '';
        } else {
            firstName = nameParts[0];
            lastName = nameParts.slice(1).join(' ');
        }
    }

    function lowerCaseEmail (user) {
        return user.email.toLowerCase().trim();
    }

    function setAgeGroup(user) {
        let result = '未設定';
        if (user.age) {
            if (user.age < 13) {
                result = '子ども';
            } else if (user.age < 20) {
                result = '10代';
            } else if (user.age < 30) {
                result = '20代';
            } else if (user.age < 40) {
                result = '30代';
            } else if (user.age < 50) {
                result = '40代';
            } else if (user.age < 60) {
                result = '50代';
            } else {
                result = '60代以上';
            }
        }
        return result;
    }

    function registrateDate (now) {
        return now.toISOString().split('T')[0];
    }
    function registrateTime (now) {
        return now.toTimeString().split(' ')[0];
    }

    function createProfile() {
        return profile = {
            personalInfo: {
                firstName: firstName,
                lastName: lastName,
                fullName: user.name.trim(),
                email: formattedEmail,
                age: user.age || '未設定',
                ageGroup: ageGroup
            },
            systemInfo: {
                registrationDate: registrationDate,
                registrationTime: registrationTime,
                formattedAt: now.toISOString()
            },
            display: {
                welcomeMessage: `ようこそ、${firstName}さん！`,
                emailDisplay: `メール: ${formattedEmail}`,
                ageDisplay: user.age ? `${user.age}歳 (${ageGroup})` : '年齢未設定'
            }
        };
    }   
}

function main() {
    // テストデータ
    const testUser1 = {
        name: '山田 太郎',
        email: 'YAMADA@Example.COM',
        age: 28
    };

    const testUser2 = {
        name: '鈴木',
        email: 'suzuki@test.com'
        // ageは未設定
    };

    // 関数実行テスト
    console.log('=== ユーザープロフィールフォーマットテスト ===');

    try {
        console.log('ユーザー1:');
        console.log(JSON.stringify(formatUserProfile(testUser1), null, 2));
        
        console.log('\nユーザー2:');
        console.log(JSON.stringify(formatUserProfile(testUser2), null, 2));
        
    } catch (error) {
        console.error('エラー:', error.message);
    }
}

main()