class SelectChapter {
    constructor(player) {
        this.player = player;

        this.player.template.mask.addEventListener('click', () => {
            this.hideBox();
        });
        this.player.template.selectChapterButton.addEventListener('click', (e) => {
            if (e.target.classList.contains('dplayer-icon')) {
                this.showBox();
                this.player.template.selectChapterBox.scrollTop = this.player.options.playlist.selected * 30;
            }
        });

        this.player.template.selectChapterBox.addEventListener('click', (e) => {
            if (e.target.classList.contains('dplayer-chapter-item')) {
                let index = parseInt(e.target.getAttribute('index'));

                if (index !== this.player.options.playlist.selected) {
                    this.player.template.selectChapterBox.children[this.player.options.playlist.selected].classList.remove('active');
                    this.player.options.playlist.selected = index;
                    this.player.switchVideo({
                        url: this.player.options.playlist.videos[index].url,
                    });
                    this.judgeNext();
                }
                setTimeout(() => {
                    this.hideBox();
                    this.player.template.selectChapterBox.children[this.player.options.playlist.selected].classList.add('active');
                }, 100);
                this.player.play();
            }
        });

        this.player.template.nextButton.addEventListener('click', () => {
            this.player.template.selectChapterBox.children[this.player.options.playlist.selected].classList.remove('active');
            this.player.options.playlist.selected += 1;
            this.player.template.selectChapterBox.children[this.player.options.playlist.selected].classList.add('active');
            this.player.switchVideo({
                url: this.player.options.playlist.videos[this.player.options.playlist.selected].url,
            });
            this.judgeNext();
            this.player.play();
        });
    }

    hideButton() {
        this.player.template.selectChapterButton.classList.add('hide');
    }

    showButton() {
        this.player.template.selectChapterButton.classList.remove('hide');
    }

    hideBox() {
        this.player.template.mask.classList.remove('dplayer-mask-show');

        this.player.controller.disableAutoHide = false;
        this.player.template.selectChapterBox.classList.remove('dplayer-select-chapter-box-open');
    }

    showBox() {
        this.player.template.mask.classList.add('dplayer-mask-show');
        this.player.controller.disableAutoHide = true;

        this.player.template.selectChapterBox.classList.add('dplayer-select-chapter-box-open');
    }

    judgeNext() {
        if (this.player.options.playlist.selected === this.player.options.playlist.videos.length - 1) {
            this.player.template.nextButton.classList.add('dplayer-next-icon-hide');
        } else {
            this.player.template.nextButton.classList.remove('dplayer-next-icon-hide');
        }
    }
}

export default SelectChapter;
