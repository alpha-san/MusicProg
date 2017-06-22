import { MusicprogtestPage } from './app.po';

describe('musicprogtest App', () => {
  let page: MusicprogtestPage;

  beforeEach(() => {
    page = new MusicprogtestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
