import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String, default: '' },
  githubId: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    // isModified()는 mongoose 모듈에 포함되어있는 함수
    // 파라미터로 들어온 값이 db에 기록된 값과 비교해서 변경된 경우는 true를,
    // 그렇지 않은 경우는 false를 반환
    this.password = await bcrypt.hash(this.password, 5);
  }
});
const User = mongoose.model('User', userSchema);
export default User;
