# Database Setup Guide - PostgreSQL

## لماذا PostgreSQL؟

PostgreSQL هو **الأقوى والأكثر مرونة**:
- ✅ يدعم JSON, Arrays, و Complex Data Types
- ✅ أقوى في التعامل مع البيانات المعقدة
- ✅ أفضل للمشاريع الكبيرة
- ✅ Open Source ومجاني
- ✅ Performance ممتاز

## الخيارات:

### 1. **Supabase (موصى به - مجاني)**
   - PostgreSQL managed
   - مجاني حتى 500MB
   - رابط مباشر: https://supabase.com

### 2. **Neon (موصى به - مجاني)**
   - Serverless PostgreSQL
   - مجاني
   - رابط مباشر: https://neon.tech

### 3. **Vercel Postgres**
   - مدمج مع Vercel
   - مجاني للبداية
   - رابط: Vercel Dashboard

### 4. **Railway (موصى به)**
   - سهل الإعداد
   - مجاني للبداية
   - رابط: https://railway.app

## خطوات الإعداد:

### 1. إنشاء Database:

#### Option A: Supabase (الأسهل)
1. اذهب إلى https://supabase.com
2. أنشئ حساب جديد
3. أنشئ مشروع جديد
4. اذهب إلى Settings > Database
5. انسخ Connection String

#### Option B: Neon
1. اذهب إلى https://neon.tech
2. أنشئ حساب جديد
3. أنشئ database جديد
4. انسخ Connection String

### 2. إضافة DATABASE_URL:

أضف إلى `.env.local`:
```env
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
```

أو لـ Supabase:
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

### 3. إضافة JWT_SECRET:

```env
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-min-32-chars"
```

### 4. تشغيل Migrations:

```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# Or push schema directly (for development)
npx prisma db push
```

### 5. (اختياري) Prisma Studio - لإدارة البيانات:

```bash
npx prisma studio
```

## الملفات المهمة:

- `prisma/schema.prisma` - Database schema
- `src/lib/prisma.ts` - Prisma client
- `.env.local` - Database connection string

## Models في Database:

1. **User** - المستخدمين
   - id, email, phone
   - faceDescriptor (بصمة الوجه)
   - voicePrint (بصمة الصوت)

2. **OTP** - رموز التحقق
   - code, email, phone
   - expiresAt, verified

3. **Session** - جلسات المستخدمين
   - token, userId
   - expiresAt

## Production Checklist:

- [ ] إضافة DATABASE_URL في Vercel Environment Variables
- [ ] إضافة JWT_SECRET في Vercel Environment Variables
- [ ] تشغيل migrations في production
- [ ] إعداد Database backups
- [ ] مراقبة Database performance

## ملاحظات:

- PostgreSQL أسرع وأقوى من MySQL للمشاريع الحديثة
- Prisma يجعل التعامل مع Database سهل جداً
- Supabase/Neon مجانيان للبداية
- يمكنك الترقية لاحقاً حسب الحاجة
