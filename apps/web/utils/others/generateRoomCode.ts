export const generateRoomCode = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const numbers = "0123456789";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  // 确保至少包含一个字母和一个数字
  let code = [
    letters.charAt(Math.floor(Math.random() * letters.length)),
    numbers.charAt(Math.floor(Math.random() * numbers.length)),
  ];

  // 填充剩余6位
  for (let i = 2; i < 8; i++) {
    code.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }

  // 随机打乱顺序
  return code.sort(() => Math.random() - 0.5).join("");
};
