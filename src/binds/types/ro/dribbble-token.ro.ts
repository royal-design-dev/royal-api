import { ApiProperty } from '@nestjs/swagger';

export class DribbbleUserRo {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  token_type: string;

  @ApiProperty()
  scope: string;
}

export type DribbbleShot = {
  id: number;
  title: string;
  description: string;
  width: number;
  height: number;
  images: {
    hidpi: string;
    normal: string;
    teaser: string;
  };
  published_at: string;
  updated_at: string;
  html_url: string;
  animated: false;
  tags: string[];
  attachments: Array<{
    id: number;
    url: string;
    thumbnail_url: string;
    size: number;
    content_type: string;
    created_at: string;
  }>;
  projects: Array<{
    id: number;
    name: string;
    description: string;
    shots_count: number;
    created_at: string;
    updated_at: string;
  }>;
  team: {
    id: number;
    name: string;
    login: string;
    html_url: string;
    avatar_url: string;
    bio: string;
    location: string;
    links: {
      web: string;
      twitter: string;
    };
    type: string;
    created_at: string;
    updated_at: string;
  };
  video: {
    id: number;
    duration: number;
    video_file_name: string;
    video_file_size: number;
    width: number;
    height: number;
    silent: boolean;
    created_at: string;
    updated_at: string;
    url: string;
    small_preview_url: string;
    large_preview_url: string;
    xlarge_preview_url: string;
  };
  low_profile: boolean;
};
