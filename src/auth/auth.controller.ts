import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import Auth from './guards/auth.guard';
import { TokenService } from './token.service';
import { LoginUserDto } from './types/dto/login-user.dto';
import { RefreshTokensDto } from './types/dto/refresh-tokens.dto';
import { LoginRo } from './types/ro/login.ro';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Logs user into the system',
  })
  @ApiBody({
    description: 'UsersEntity credentials',
    type: LoginUserDto,
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: LoginRo,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication failed due to incorrect username or password.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  public async login(@Body(new ValidationPipe()) userDto: LoginUserDto) {
    const loginResults = await this.authService.login(userDto);

    if (!loginResults)
      throw new UnauthorizedException(
        'Authentication failed due to incorrect username or password.',
      );

    return loginResults;
  }

  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Refresh user tokens',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: LoginRo,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  public async refreshTokens(
    @Body(new ValidationPipe()) refreshTokens: RefreshTokensDto,
  ): Promise<LoginRo> {
    return this.tokenService.getAccessTokenFromRefreshToken(
      refreshTokens.refresh_token,
    );
  }

  @Post('check-tokens')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Check user tokens',
  })
  @ApiOkResponse({
    description: 'Successful operation',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  public checkingTokens(): boolean {
    return true;
  }

  // @Get('/check-post')
  // @ApiOperation({
  //   summary: 'Change Shot by id',
  // })
  // @ApiOkResponse({
  //   description: 'Successful operation',
  //   type: ShotsRo,
  // })
  // @HttpCode(HttpStatus.OK)
  // @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  // async checkPost(@Body() body: any): Promise<any> {
  //   console.log(body);

  //   // await page();

  //   return true;
  // }

  // @Get('check-post')
  // @HttpCode(HttpStatus.OK)
  // @ApiOkResponse({
  //   description: 'Checked',
  // })
  // @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  // public async connectDribbble(
  //   @Body(new ValidationPipe()) body: any,
  // ): Promise<string> {
  //   const page = async () => {
  //     // const browser = await pup.launch({
  //     //   headless: false,
  //     // });
  //     // const context = await browser.createIncognitoBrowserContext();
  //     // const page = await context.newPage();

  //     // // await page(
  //     // //   'Googlebot/2.1 (+http://www.googlebot.com/bot.html)',
  //     // // );

  //     // await page.goto(
  //     //   'https://dribbble.com/shots/18147424-WinWin-Online-Casino-Landing-Page',
  //     // );

  //     // // await page.screenshot({ path: 'example.png' });

  //     // await context.close();

  //     const browser = await pup.launch({
  //       headless: false,
  //     });
  //     const context = await browser.createIncognitoBrowserContext();
  //     const page = await context.newPage();
  //     page.setJavaScriptEnabled(false);

  //     page.setUserAgent(
  //       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
  //     );

  //     await page.goto(
  //       'https://dribbble.com/shots/18147424-WinWin-Online-Casino-Landing-Page',
  //     );
  //     await page.waitForTimeout(5000);

  //     await page.mouse.wheel({ deltaY: 1000 });

  //     await page.waitForTimeout(2000);

  //     await context.close();
  //   };

  //   await page();

  //   return `https://dribbble.com/oauth/authorize?scope=public+write+upload`;
  // }
}
