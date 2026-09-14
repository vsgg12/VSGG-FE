'use client';

import { useSidebarStore } from '@/store/sidebar/useSidebarStore';

interface IconProps {
  className?: string;
  alt?: string;
}

const POST_ITEM_ICON_SRC = {
  like: {
    light: '/svg/postItem/heart_light.svg',
    dark: '/svg/postItem/heart_dark.svg',
  },
  vote: {
    light: '/svg/postItem/vote_light.svg',
    dark: '/svg/postItem/vote_dark.svg',
  },
  comment: {
    light: '/svg/postItem/comment_light.svg',
    dark: '/svg/postItem/comment_dark.svg',
  },
  floatingComment: {
    light: '/svg/postItem/floating_comment_light.svg',
    dark: '/svg/postItem/floating_comment_dark.svg',
  },
  share: {
    light: '/svg/postItem/share_light.svg',
    dark: '/svg/postItem/share_dark.svg',
  },
  view: {
    light: '/svg/postItem/like_light.svg',
    dark: '/svg/postItem/like_dark.svg',
  },
  mediaLike: {
    light: '/svg/postItem/heart_white.svg',
    dark: '/svg/postItem/heart_white.svg',
  },
} as const;

function usePostItemIconSrc(icon: keyof typeof POST_ITEM_ICON_SRC) {
  const isDarkMode = useSidebarStore((state) => state.isDarkMode);

  return isDarkMode ? POST_ITEM_ICON_SRC[icon].dark : POST_ITEM_ICON_SRC[icon].light;
}

function PostSvgIcon({
  icon,
  className,
  alt = '',
}: IconProps & { icon: keyof typeof POST_ITEM_ICON_SRC }) {
  const src = usePostItemIconSrc(icon);

  return (
    <img
      src={src}
      className={`shrink-0 object-contain ${className ?? ''}`}
      alt={alt}
      aria-hidden={alt === ''}
      draggable={false}
    />
  );
}

export function VoteActionIcon({ className = 'h-[24px] w-[24px]', alt = '' }: IconProps) {
  return <PostSvgIcon icon='vote' className={className} alt={alt} />;
}

export function LikeActionIcon({ className = 'h-[24px] w-[24px]', alt = '' }: IconProps) {
  return <PostSvgIcon icon='like' className={className} alt={alt} />;
}

export function CommentActionIcon({ className = 'h-[24px] w-[24px]', alt = '' }: IconProps) {
  return <PostSvgIcon icon='comment' className={className} alt={alt} />;
}

export function FloatingCommentActionIcon({
  className = 'h-[24px] w-[24px]',
  alt = '',
}: IconProps) {
  return <PostSvgIcon icon='floatingComment' className={className} alt={alt} />;
}

export function ShareActionIcon({ className = 'h-[24px] w-[24px]', alt = '' }: IconProps) {
  return <PostSvgIcon icon='share' className={className} alt={alt} />;
}

export function ViewActionIcon({ className = 'h-[24px] w-[24px]', alt = '' }: IconProps) {
  return <PostSvgIcon icon='view' className={className} alt={alt} />;
}

export function MediaLikeActionIcon({ className = 'h-[16px] w-[16px]', alt = '' }: IconProps) {
  return <PostSvgIcon icon='mediaLike' className={className} alt={alt} />;
}
