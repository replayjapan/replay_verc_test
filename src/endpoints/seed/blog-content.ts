// Blog content seed data — inlined from blog-content-seed.json per Rule 18
// Content has been editorially reviewed — do NOT rewrite

export const blogContentSeed = {
  "posts": [
    {
      "title": "Next.js アプリをスマホで確認する方法",
      "slug": "nextjs-mobile-local-network-jp",
      "_status": "published",
      "heroImage": null,
      "authors": [
        "Craig (rePlay LLC)"
      ],
      "categories": [
        "Web Development"
      ],
      "tags": [
        {
          "tag": "Next.js"
        },
        {
          "tag": "モバイル確認"
        },
        {
          "tag": "ローカル開発"
        },
        {
          "tag": "Web Development"
        }
      ],
      "publishedAt": "2026-03-26T09:00:00.000Z",
      "searchExcerpt": "Next.js をスマホ実機で確認するための、安全で現実的な開発手順を整理します。",
      "searchKeywords": "Next.js,スマホ確認,ローカルネットワーク,0.0.0.0,開発環境,iPhone,Android",
      "meta": {
        "title": "Next.js アプリをスマホで確認する方法 | rePlay",
        "description": "Next.js の開発中アプリを iPhone や Android で確認する手順を、2026年時点の挙動に合わせて整理。ローカルIP、ホスト設定、セキュリティ上の注意点まで解説します。",
        "ogTitle": "Next.js アプリをスマホで確認する方法",
        "ogDescription": "ローカル開発中の Next.js を実機スマホで確認するための最新手順と注意点。",
        "noIndex": false
      },
      "relatedPosts": [],
      "content": {
        "root": {
          "type": "root",
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "PC 上では整って見えるのに、スマートフォンで開くと余白や文字組み、固定ヘッダーの挙動が変わる。これは Next.js 開発でも日常的に起きます。だからこそ、公開前に実機で確認できる状態を早めに作っておく価値があります。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "heading",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "まず確認すること",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "tag": "h2",
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "前提はシンプルです。開発用 PC とスマートフォンを同じ Wi-Fi に接続し、PC のローカル IP アドレスを確認します。Windows なら ipconfig、macOS ならシステム設定のネットワーク、またはターミナルの ifconfig で確認できます。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "heading",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "2026 年時点の Next.js で変わった点",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "tag": "h2",
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "古い解説では package.json の dev スクリプトを \"next -H 0.0.0.0\" に変える手順がよく紹介されていました。ただ、2026 年時点の Next.js CLI では next dev のホスト既定値は 0.0.0.0 です。つまり、標準の dev 起動でそのまま LAN 内から見られるケースが増えています。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "それでもアクセスできない場合は、開発サーバーを明示的に全インターフェースで待ち受けさせます。npm なら npm run dev -- --hostname 0.0.0.0、pnpm や yarn なら next dev --hostname 0.0.0.0 のように指定しておくと切り分けがしやすくなります。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "heading",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "スマホからの開き方",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "tag": "h2",
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "たとえば PC のローカル IP が 192.168.1.5 でポートが 3000 なら、iPhone でも Android でもブラウザで http://192.168.1.5:3000 にアクセスします。PC 側のファイアウォール設定が厳しい場合は、その許可も必要です。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "実機確認で特に見ておきたいのは、フォントレンダリング、100vh 周辺の高さ計算、固定フッターやメニューのタップ領域、フォーム入力時のズーム、画像最適化後の見え方です。PC エミュレーションで問題がなくても、実機でだけ崩れる箇所はまだ残ります。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "heading",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "セキュリティ上の注意",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "tag": "h2",
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "ローカルネットワークに開いた開発サーバーは、あくまで確認用です。公共 Wi-Fi では使わないこと、不要になったらすぐ止めること、認証や API キーを開発用に分離しておくこと。このあたりは地味ですが、運用事故を減らします。OAuth、Secure Cookie、Service Worker など HTTPS 前提の検証が必要なら、開発用 HTTPS を使う判断も早めにしておくと後戻りが減ります。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "日本向けサイトでは、見た目の完成度だけでなく、スマホでの読みやすさや入力しやすさが検索評価と直結しやすい場面があります。実機確認まで含めて開発フローを整えたい場合は、",
                  "version": 1
                },
                {
                  "type": "link",
                  "children": [
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": "rePlay の SEO サービス",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "fields": {
                    "linkType": "custom",
                    "newTab": false,
                    "url": "/services/seo"
                  },
                  "format": "",
                  "indent": 0,
                  "version": 3
                },
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "や、",
                  "version": 1
                },
                {
                  "type": "link",
                  "children": [
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": "お問い合わせ",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "fields": {
                    "linkType": "custom",
                    "newTab": false,
                    "url": "/contact"
                  },
                  "format": "",
                  "indent": 0,
                  "version": 3
                },
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "からご相談ください。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            }
          ],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "version": 1
        }
      }
    },
    {
      "title": "Yahoo! JAPAN と Google、日本市場で起きている“二重露出”の考え方",
      "slug": "yahoo-japan-google-twin-seo-ranking",
      "_status": "published",
      "heroImage": null,
      "authors": [
        "Craig (rePlay LLC)"
      ],
      "categories": [
        "SEO"
      ],
      "tags": [
        {
          "tag": "Yahoo! JAPAN"
        },
        {
          "tag": "Google"
        },
        {
          "tag": "日本 SEO"
        },
        {
          "tag": "検索戦略"
        }
      ],
      "publishedAt": "2026-03-26T09:10:00.000Z",
      "searchExcerpt": "Yahoo! JAPAN と Google の関係を前提に、日本 SEO をどう設計するかを整理します。",
      "searchKeywords": "Yahoo! JAPAN,Google,日本SEO,検索順位,オーガニック検索,SEO戦略",
      "meta": {
        "title": "Yahoo! JAPAN と Google の検索関係を理解する | rePlay",
        "description": "Yahoo! JAPAN と Google の検索結果の近さを前提に、日本市場の SEO をどう考えるべきかを解説。順位だけでなく SERP 表示や導線の違いにも触れます。",
        "ogTitle": "Yahoo! JAPAN と Google、日本市場の SEO をどう見るか",
        "ogDescription": "Google での評価が Yahoo! JAPAN にどう影響するのか。日本市場の実務視点で整理します。",
        "noIndex": false
      },
      "relatedPosts": [],
      "content": {
        "root": {
          "type": "root",
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "海外案件のチームと話していると、日本でも Yahoo は Bing 系と考えられていることがあります。けれど日本市場では前提が違います。Yahoo! JAPAN の検索は、長く Google の検索技術を基盤にしてきました。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "heading",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "まず押さえたいこと",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "tag": "h2",
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "オーガニック検索の評価軸は近いため、Google で適切に評価されるページは Yahoo! JAPAN でも近い順位帯に入ることが多くあります。日本の SEO 実務で、技術改善とコンテンツ改善を Google 基準で詰める意味が大きいのはこのためです。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "heading",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "ただし、同じではありません",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "tag": "h2",
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "ここで誤解しやすいのは、Google で 1 位なら Yahoo! JAPAN でも完全に同じ見え方になる、という理解です。実際にはポータル内の独自要素、ニュースや知恵袋系の露出、広告面、画面構成の違いがあり、クリックの分配は同一にはなりません。順位が近くても、流入の質や見え方までは一致しないということです。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "だから rePlay では、Google での評価改善を主軸にしつつ、Yahoo! JAPAN 側でも実際の表示面を確認します。タイトルの見切れ方、ブランド名の出し方、比較検討時に並ぶ競合の顔ぶれ。このあたりまで見てはじめて、日本市場の検索導線が読みやすくなります。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "heading",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "日本 SEO で効率が出る理由",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "tag": "h2",
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "技術 SEO、情報設計、内部リンク、見出し構造、一次情報を含むコンテンツ整備。これらを Google 基準できちんと積み上げると、日本では結果的に Yahoo! JAPAN 側の取りこぼしも減らしやすくなります。検索エンジンごとに別々の最適化を大量に持つ必要がないぶん、改善の優先順位を整理しやすいのは確かな利点です。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "heading",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "順位より先に、検索面を読む",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "tag": "h2",
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "日本の検索運用では、単に順位表を追うだけでは足りません。Google と Yahoo! JAPAN の両方で、ブランドがどう見えるか、FAQ やレビューがどう並ぶか、競合比較が起きる位置に何が出るか。この視点を持つと、SEO と SEM の分担もきれいになります。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "日本向けの検索導線を整理したい場合は、",
                  "version": 1
                },
                {
                  "type": "link",
                  "children": [
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": "SEO サービス",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "fields": {
                    "linkType": "custom",
                    "newTab": false,
                    "url": "/services/seo"
                  },
                  "format": "",
                  "indent": 0,
                  "version": 3
                },
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "、",
                  "version": 1
                },
                {
                  "type": "link",
                  "children": [
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": "SEM サービス",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "fields": {
                    "linkType": "custom",
                    "newTab": false,
                    "url": "/services/sem"
                  },
                  "format": "",
                  "indent": 0,
                  "version": 3
                },
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "、",
                  "version": 1
                },
                {
                  "type": "link",
                  "children": [
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": "お問い合わせ",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "fields": {
                    "linkType": "custom",
                    "newTab": false,
                    "url": "/contact"
                  },
                  "format": "",
                  "indent": 0,
                  "version": 3
                },
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "をご覧ください。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            }
          ],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "version": 1
        }
      }
    },
    {
      "title": "日本 SEO を考えるときに、最初に見直したいこと",
      "slug": "japanese-seo-landscape-guide",
      "_status": "published",
      "heroImage": null,
      "authors": [
        "Craig (rePlay LLC)"
      ],
      "categories": [
        "SEO"
      ],
      "tags": [
        {
          "tag": "日本 SEO"
        },
        {
          "tag": "ローカライゼーション"
        },
        {
          "tag": "モバイル"
        },
        {
          "tag": "コンテンツ戦略"
        }
      ],
      "publishedAt": "2026-03-26T09:20:00.000Z",
      "searchExcerpt": "日本 SEO を始める前に押さえたい、モバイル、言語、検索行動の前提をまとめます。",
      "searchKeywords": "日本SEO,ローカライゼーション,モバイルファースト,Yahoo! JAPAN,Google,日本市場",
      "meta": {
        "title": "日本 SEO を考えるときに、最初に見直したいこと | rePlay",
        "description": "日本市場向け SEO の基本前提を整理。モバイルファースト、Google と Yahoo! JAPAN、翻訳では足りないローカライズ、URL 設計まで実務視点でまとめます。",
        "ogTitle": "日本 SEO を考えるときに、最初に見直したいこと",
        "ogDescription": "日本市場向けの検索最適化で、最初に外したくないポイントを整理します。",
        "noIndex": false
      },
      "relatedPosts": [],
      "content": {
        "root": {
          "type": "root",
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "日本向け SEO は、英語圏サイトの延長で考えると細部でずれます。検索エンジンの仕様だけでなく、ユーザーがどう言葉を選び、どの画面で比較し、何を不安に感じるかが少しずつ違うからです。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "heading",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "モバイル前提で組み立てる",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "tag": "h2",
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "日本では日常的な検索の多くがスマートフォンで完結します。表示速度、見出しの短さ、ファーストビューの情報密度、フォームの入力しやすさ。これらは UX の話であると同時に、検索からの離脱率にも直結します。PC 版を整えてから縮めるより、最初からモバイル基準で設計したほうが無理が出にくいです。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "heading",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "Google を見ればよい、で終わらせない",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "tag": "h2",
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "日本では Yahoo! JAPAN が Google の検索技術を基盤にしているため、SEO の主戦場はたしかに Google 基準で組み立てられます。ただし、実務では検索面の見え方や比較文脈が違うため、Google だけを見て判断するとブランド訴求やクリック率の改善機会を落とします。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "heading",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "翻訳ではなく、日本語で編集する",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "tag": "h2",
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "日本語コンテンツは、単語を置き換えただけでは自然になりません。検索される語が省略形なのか、カタカナなのか、漢字なのかで意図が変わることがあります。説明の順番も、英語の論理展開をそのまま持ち込むと読みづらくなります。ローカライズは翻訳作業ではなく、文脈の再編集です。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "heading",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "URL は短く、意味は明確に",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "tag": "h2",
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "英語圏ではタイトルをそのまま URL に近い形で落とし込むことが多い一方、日本ではそこまで厳密でなくても機能します。とはいえ、意味の通らない文字列や長すぎるスラッグは避けたいところです。共有しやすく、管理しやすく、検索結果でも認識しやすいこと。この三つが揃えば十分に強い設計になります。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "heading",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "文字数の感覚も英語と違う",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "tag": "h2",
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "日本語では少ない文字数でも意味が詰まるため、タイトルやディスクリプションの最適値も英語と同じ感覚では扱えません。短くても情報が足りる反面、詰め込みすぎると急に読みにくくなります。検索結果の見え方は、翻訳前のテンプレートを流用せず、日本語で組み直すほうが安定します。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "日本市場向けに SEO と広告運用を一体で見直したい場合は、",
                  "version": 1
                },
                {
                  "type": "link",
                  "children": [
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": "SEO サービス",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "fields": {
                    "linkType": "custom",
                    "newTab": false,
                    "url": "/services/seo"
                  },
                  "format": "",
                  "indent": 0,
                  "version": 3
                },
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "、",
                  "version": 1
                },
                {
                  "type": "link",
                  "children": [
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": "SEM サービス",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "fields": {
                    "linkType": "custom",
                    "newTab": false,
                    "url": "/services/sem"
                  },
                  "format": "",
                  "indent": 0,
                  "version": 3
                },
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "、",
                  "version": 1
                },
                {
                  "type": "link",
                  "children": [
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": "お問い合わせ",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "fields": {
                    "linkType": "custom",
                    "newTab": false,
                    "url": "/contact"
                  },
                  "format": "",
                  "indent": 0,
                  "version": 3
                },
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "からどうぞ。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            }
          ],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "version": 1
        }
      }
    }
  ],
  "articles": [
    {
      "title": "タイプイン流入ドメインとは何か",
      "slug": "type-in-traffic-domains-value",
      "_status": "published",
      "featuredImage": null,
      "author": "Craig (rePlay LLC)",
      "excerpt": "タイプイン流入ドメインの背景をたどりながら、なぜシンプルなドメイン名が今でも価値を持ちうるのかを整理します。検索以前の閲覧体験と、ドメインの歴史的な強さをつなげて考えるための記事です。",
      "categories": [
        "Domains"
      ],
      "tags": [
        {
          "tag": "ドメイン"
        },
        {
          "tag": "タイプイン流入"
        },
        {
          "tag": "ブランド価値"
        },
        {
          "tag": "プレミアムドメイン"
        }
      ],
      "articleType": "article",
      "publishedAt": "2026-03-26T09:30:00.000Z",
      "searchExcerpt": "タイプイン流入の仕組みと、短く強いドメイン名が持つ歴史的な価値を解説します。",
      "searchKeywords": "タイプイン流入,ドメイン価値,プレミアムドメイン,アニメ.com,Safari,ブラウザ履歴",
      "meta": {
        "title": "タイプイン流入ドメインとは何か | rePlay",
        "description": "検索エンジン以前のブラウザ挙動から見えるタイプイン流入の実態と、プレミアムドメインが持つ歴史的価値を解説。アニメ.com での実体験も紹介します。",
        "ogTitle": "タイプイン流入ドメインとは何か",
        "ogDescription": "ブラウザの歴史、直接流入、ブランド想起の観点からドメイン価値を整理します。",
        "noIndex": false
      },
      "content": {
        "root": {
          "type": "root",
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "ドメインの話になると、ときどき「タイプイン流入」という言葉が出てきます。ただ、この言葉は意味だけが独り歩きしやすく、どこから来た流入なのかが曖昧なまま語られることも少なくありません。ここでは、検索が現在ほど支配的ではなかった時代のブラウザ挙動を踏まえながら、この概念を整理してみます。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "heading",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "タイプイン流入は、何を指していたのか",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "tag": "h2",
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "現在の感覚では、ユーザーは検索窓に言葉を入れて候補から選ぶのが普通です。けれど過去の主要ブラウザには、アドレスバーに単語を入れると自動で .com を補ってアクセスしようとする挙動がありました。つまり、一語の generic term を入れた結果としてドメインへ到達する流れが、ブラウザ側で発生していたわけです。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "Internet Explorer、初期の Firefox、そして初期の iPhone Safari にも、その系譜があります。複数語では成立しにくく、短く単純な一語ドメインが強かった背景には、こうしたブラウザの補完動作がありました。流入のすべてがユーザーの明確な指名入力だった、という理解は正確ではありません。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "heading",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "アニメ.com で実際に起きていたこと",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "tag": "h2",
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "私は 2005 年から アニメ.com を保有しており、2008 年ごろ、そのアクセスの出どころを詳しく確かめるために iframe と Google Analytics を使って挙動を追いました。すると、日本の iPhone ユーザーからのアクセスが目立っていたことが見えてきます。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "背景にあったのは、当時の Safari が一語の入力に対して .com を補う挙動です。日本語でも英語でも、一語であればその補完に引っ張られる場面がありました。つまり、そのアクセスは必ずしもユーザーが最初から「アニメ.com に行こう」と意図していたものだけではなく、ブラウザの実装が生んだ流れでもあったのです。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "heading",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "それでも、短い良いドメインが弱くなるわけではない",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "tag": "h2",
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "ここで大事なのは、タイプイン流入の一部がブラウザ由来だったと分かっても、ドメインそのものの価値が消えるわけではないという点です。むしろ、短く覚えやすく、カテゴリ名そのものに近いドメインは、検索時代になった今でもブランド想起、口頭共有、広告クリエイティブ、名刺や動画での視認性において強さを持ちます。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "プレミアムドメインの価値は、過去の流入神話だけで説明するものではありません。歴史の中で選ばれてきた短さ、意味の明快さ、そしてブランドの芯になりやすいこと。この積み重ねがあるから、良いドメインは今でも事業の土台として評価されます。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "heading",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "ドメインを、過去の数字だけで見ないために",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "tag": "h2",
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "古いアクセスログや parking の数字だけを見ると、タイプイン流入を誤読しやすくなります。けれど、だからといって歴史のあるドメインが無意味になるわけではありません。大切なのは、そのドメインが今の事業文脈で何を伝えられるか、どんな記憶を残せるか、どんな検索導線や広告導線と相性が良いかを見直すことです。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "ドメインの意味づけから SEO・広告導線まで一緒に整理したい場合は、",
                  "version": 1
                },
                {
                  "type": "link",
                  "children": [
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": "SEO サービス",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "fields": {
                    "linkType": "custom",
                    "newTab": false,
                    "url": "/services/seo"
                  },
                  "format": "",
                  "indent": 0,
                  "version": 3
                },
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "、",
                  "version": 1
                },
                {
                  "type": "link",
                  "children": [
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": "SEM サービス",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "fields": {
                    "linkType": "custom",
                    "newTab": false,
                    "url": "/services/sem"
                  },
                  "format": "",
                  "indent": 0,
                  "version": 3
                },
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "、",
                  "version": 1
                },
                {
                  "type": "link",
                  "children": [
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": "お問い合わせ",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "fields": {
                    "linkType": "custom",
                    "newTab": false,
                    "url": "/contact"
                  },
                  "format": "",
                  "indent": 0,
                  "version": 3
                },
                {
                  "type": "text",
                  "detail": 0,
                  "format": 0,
                  "mode": "normal",
                  "style": "",
                  "text": "からご相談いただけます。",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "textFormat": 0,
              "version": 1
            }
          ],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "version": 1
        }
      }
    }
  ]
}
