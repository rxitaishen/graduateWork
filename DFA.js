const SensitiveWords = require('dfa-sensitive-words');

// 创建一个敏感词检查器
const sensitiveWords = new SensitiveWords();

// 添加敏感词
sensitiveWords.addWords(['敏感词1', '敏感词2', '敏感词3']);

// 检查字符串是否包含敏感词
const text = '这是一段包含敏感词1的文本';
const hasSensitiveWords = sensitiveWords.check(text);
console.log(hasSensitiveWords); // true
