import type { UserType } from './user';

export type BlogVo = {
  /**
   * 主键
   */
  id: number;
  /**
   * 创建用户的相关信息
   */
  user: UserType;

  /**
   * 标题
   */
  title: string;

  /**
   * 相关照片，最多9张，图片URL数组
   */
  images: string[];

  /**
   * 博客的内容
   */
  content: string;

  /**
   * 点赞数量
   */
  liked: number;

  /**
   * 评论数量
   */
  comments: number;

  /**
   * 创建时间
   */
  createTime: Date;

  /**
   * 当前用户是否点赞
   */
  isLiked: boolean;
}