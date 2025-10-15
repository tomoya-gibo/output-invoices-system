// リファクタリングタスク: 関数の抽出を行ってください

// ユーザー情報のバリデーション
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

//年齢グループの判別を行う関数
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
    return result
    }
}

//10/15
//ユーザー情報のフォーマットを行う関数
function formatUserProfile(user) {
    userValidation(user);
    // 名前のフォーマット（姓と名を分割）
    let firstName = '';
    let lastName = '';
    const nameParts = user.name.trim().split(' ');
    if (nameParts.length === 1) {
        firstName = nameParts[0];
        lastName = '';
    } else {
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(' ');
    }
    
    // メールアドレスのフォーマット（小文字化）
    const formattedEmail = user.email.toLowerCase().trim();
    const userera = ageGroup(user)
        
    // 登録日時のフォーマット
    const now = new Date();
    const registrationDate = now.toISOString().split('T')[0];
    const registrationTime = now.toTimeString().split(' ')[0];
    
    // プロフィールの生成
    const profile = {
        personalInfo: {
            firstName: firstName,
            lastName: lastName,
            fullName: user.name.trim(),
            email: formattedEmail,
            age: user.age || '未設定',
            ageGroup: userera
        },
        systemInfo: {
            registrationDate: registrationDate,
            registrationTime: registrationTime,
            formattedAt: now.toISOString()
        },
        display: {
            welcomeMessage: `ようこそ、${firstName}さん！`,
            emailDisplay: `メール: ${formattedEmail}`,
            ageDisplay: user.age ? `${user.age}歳 (${userera})` : '年齢未設定'
        }
    };
    
    return profile;
}

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