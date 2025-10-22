// リファクタリングタスク: 関数の抽出を行ってください

// ユーザー情報のバリデーションチェック関数
function userValidation(user) {
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

// 年齢グループの判別を行う関数
function ageGroup(user) {
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
        return result;
    }
}

// ユーザーの登録日時の作成を行う関数
function registrationDate() {
    const now = new Date();

    return {
        registrationDate: now.toISOString().split('T')[0],
        registrationTime: now.toTimeString().split(' ')[0],
        formattedAt: now.toISOString()
    };
}

//　表示されるユーザーデータを整える関数
function showUserData(user){
    return {
        personalInfo: userProfileData(user),
        systemInfo: registrationDate(),
        display: {
            welcomeMessage: `ようこそ、${firstName}さん！`,
            emailDisplay: `メール: ${formattedEmail}`,
            ageDisplay: user.age ? `${user.age}歳 (${user.ageGroup})` : '年齢未設定'
        }
    };
}

function userProfileData(user){
    // メールアドレスのフォーマット（小文字化）
    const formattedEmail = user.email.toLowerCase().trim();
    // ユーザーの年齢区分
    const userAgeGroup = ageGroup(user);
    const format = formatUserProfile(user)
    console.log(format);
    let firstName = format.firstName;
    console.log(firstName);
    let lastName = format.lastName;
    console.log(lastName);
    return {
        firstName: firstName,
        lastName: lastName,
        fullName: user.name.trim(),
        email: formattedEmail,
        age: user.age || '未設定',
        ageGroup: userAgeGroup    
    }
}

// ユーザー情報のフォーマットを行う関数
function formatUserProfile(user) {
    userValidation(user);
    // 名前のフォーマット（姓と名を分割）
    let firstName = '';
    let lastName = '';
    const nameParts = user.name.trim().split(' ');
    console.log(nameParts);
    if (nameParts.length === 1) {
        firstName = nameParts[0];
        lastName = '';
        return {firstName, lastName};
    } else {
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(' ');
        return {firstName, lastName};
    }
    // // メールアドレスのフォーマット（小文字化）
    // const formattedEmail = user.email.toLowerCase().trim();
    // // ユーザーの年齢区分
    // const userAgeGroup = ageGroup(user);
    // return {
    //     firstName: firstName,
    //     lastName: lastName,
    //     fullName: user.name.trim(),
    //     email: formattedEmail,
    //     age: user.age || '未設定',
    //     ageGroup: userAgeGroup    
    // }
}
    

    // // プロフィールの生成
    // const profile = {
    //     personalInfo: {
    //         firstName: firstName,
    //         lastName: lastName,
    //         fullName: user.name.trim(),
    //         email: formattedEmail,
    //         age: user.age || '未設定',
    //         ageGroup: userAgeGroup
    //     },
    //     systemInfo: registrationDate(),
    //     display: {
    //         welcomeMessage: `ようこそ、${firstName}さん！`,
    //         emailDisplay: `メール: ${formattedEmail}`,
    //         ageDisplay: user.age ? `${user.age}歳 (${userAgeGroup})` : '年齢未設定'
    //     }
    // };

    // return profile;

    //createUser(user);


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
    console.log(JSON.stringify(showUserData(testUser1), null, 2));
    
    console.log('\nユーザー2:');
    console.log(JSON.stringify(formatUserProfile(testUser2), null, 2));
} catch (error) {
    console.error('エラー:', error.message);
}