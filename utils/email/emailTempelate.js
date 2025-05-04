export const emailTempelate = (activeLink) => {
  const emailTemplate = `
  <html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta
      name="format-detection"
      content="telephone=no,address=no,email=no,date=no,url=no"
    />

    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />

    <!--[if !mso]><!-->

    <link
      rel="preload"
      as="style"
      href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&display=swap"
    />

    <style type="text/css">
      @import url(https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&display=swap);
    </style>
    <title></title>

    <style>
      :root {
        color-scheme: light;
        supported-color-schemes: light;
      }

      html,
      body {
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;

        overflow-wrap: break-word;
        -ms-word-break: break-all;
        -ms-word-break: break-word;
        word-break: break-all;
        word-break: break-word;
      }

      center,
      #body_table {
      }

      ul,
      ol {
        padding: 0;
        margin-top: 0;
        margin-bottom: 0;
      }

      li {
        margin-bottom: 0;
      }

      .list-block-list-outside-left li {
        margin-left: 20px !important;
      }

      .list-block-list-outside-right li {
        margin-right: 20px !important;
      }

      .paragraph {
        font-size: 16px;
        font-family: Open Sans, sans-serif;
        font-weight: normal;
        font-style: normal;
        text-align: start;
        line-height: 2;
        text-decoration: none;
        color: #535353;
      }

      .heading1 {
        font-size: 40px;
        font-family: Montserrat, sans-serif;
        font-weight: bold;
        font-style: normal;
        text-align: start;
        line-height: 1.5;
        text-decoration: none;
        color: #000000;
      }

      .heading2 {
        font-size: 30px;
        font-family: Montserrat, sans-serif;
        font-weight: normal;
        font-style: normal;
        text-align: start;
        line-height: 1.5;
        text-decoration: none;
        color: #000000;
      }

      .heading3 {
        font-size: 24px;
        font-family: Montserrat, sans-serif;
        font-weight: normal;
        font-style: normal;
        text-align: start;
        line-height: 1.5;
        text-decoration: none;
        color: #000000;
      }

      .list {
        font-size: 16px;
        font-family: Open Sans, sans-serif;
        font-weight: normal;
        font-style: normal;
        text-align: start;
        line-height: 2;
        text-decoration: none;
        color: #535353;
      }

      p a,
      li a {
        color: #5457ff;
        text-decoration: none;
        font-style: normal;
        font-weight: normal;
      }

      .button-table a {
        text-decoration: none;
        font-style: normal;
        font-weight: normal;
      }

      .paragraph > span {
        text-decoration: none;
      }
      .heading1 > span {
        text-decoration: none;
      }
      .heading2 > span {
        text-decoration: none;
      }
      .heading3 > span {
        text-decoration: none;
      }
      .list > span {
        text-decoration: none;
      }

      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }

      #MessageViewBody,
      #MessageWebViewDiv {
        width: 100% !important;
      }

      table {
        border-collapse: collapse;
        border-spacing: 0;
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
      }
      table:not(.button-table) {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
      }

      th {
        font-weight: normal;
      }

      tr td p {
        margin: 0;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      a[x-apple-data-detectors],
      .unstyle-auto-detected-links a,
      .aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .im {
        color: inherit !important;
      }

      .a6S {
        display: none !important;
        opacity: 0.01 !important;
      }

      img.g-img + div {
        display: none !important;
      }

      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .contentMainTable {
          min-width: 320px !important;
        }
      }

      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .contentMainTable {
          min-width: 375px !important;
        }
      }

      @media only screen and (min-device-width: 414px) {
        u ~ div .contentMainTable {
          min-width: 414px !important;
        }
      }
    </style>
    <style>
      @media only screen and (max-device-width: 449px) {
        .contentMainTable {
          width: 100% !important;
          margin: auto !important;
        }
        .single-column {
          width: 100% !important;
          margin: auto !important;
        }
        .multi-column {
          width: 100% !important;
          margin: auto !important;
        }
        .imageBlockWrapper {
          width: 100% !important;
          margin: auto !important;
        }
      }
      @media only screen and (max-width: 449px) {
        .contentMainTable {
          width: 100% !important;
          margin: auto !important;
        }
        .single-column {
          width: 100% !important;
          margin: auto !important;
        }
        .multi-column {
          width: 100% !important;
          margin: auto !important;
        }
        .imageBlockWrapper {
          width: 100% !important;
          margin: auto !important;
        }
      }
    </style>

    <style>
      table .button-td a,
      table p,
      table li {
        -ms-word-break: break-all;
        -ms-word-break: break-word;
        word-break: break-all !important;
        word-break: break-word !important;
      }
    </style>
  </head>

  <body
    width="100%"
    style="
      margin: 0;
      padding: 0 !important;
      mso-line-height-rule: exactly;
      background-color: #f6f7f9;
    "
  >
    <center
      role="article"
      aria-roledescription="email"
      lang="en"
      style="width: 100%; background-color: #f6f7f9"
    >
      <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" id="body_table" width="100%" style="background-color: #f6f7f9;">
            <tbody>    
                <tr>
                    <td>
                    <![endif]-->
      <table
        align="center"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
        width="449"
        style="margin: auto"
        class="contentMainTable"
      >
        <tr class="wp-block-editor-imageblock-v1">
          <td
            style="
              background-color: #f5f6f8;
              padding-top: 40px;
              padding-bottom: 40px;
              padding-left: 40px;
              padding-right: 40px;
            "
            align="left"
          >
            <table
              align="left"
              width="100%"
              class="imageBlockWrapper"
              style="width: 100%; border-spacing: 0; border-collapse: collapse"
              role="presentation"
            >
              <tbody>
                <tr align="left">
                  <td style="padding: 0">
                    <img
                      src="https://api.smtprelay.co/userfile/49540e0f-2e09-4101-a05d-5032842b99d3/SaaS_Forge_logo.png"
                      width="110.7"
                      height=""
                      alt=""
                      style="
                        border-radius: 0px;
                        display: block;
                        height: auto;
                        width: 30%;
                        max-width: 100%;
                        border: 0;
                      "
                      class="g-img"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr class="wp-block-editor-headingblock-v1">
          <td
            valign="top"
            style="
              background-color: #5457ff;
              display: block;
              padding-top: 80px;
              padding-right: 32px;
              padding-bottom: 8px;
              padding-left: 32px;
              text-align: center;
            "
          >
            <p
              style="
                font-family: Montserrat, sans-serif;
                text-align: center;
                line-height: 46px;
                font-size: 40px;
                background-color: #5457ff;
                color: #000000;
                margin: 0;
                word-break: normal;
              "
              class="heading1"
            >
              <span style="color: #ffffff">"تأكيد الحساب"<br /></span>
            </p>
          </td>
        </tr>
        <tr class="wp-block-editor-imageblock-v1">
          <td
            style="
              background-color: #5457ff;
              padding-top: 20px;
              padding-bottom: 72px;
              padding-left: 40px;
              padding-right: 40px;
            "
            align="center"
          >
            <table
              align="center"
              width="100%"
              class="imageBlockWrapper"
              style="width: 100%; border-spacing: 0; border-collapse: collapse"
              role="presentation"
            >
              <tbody>
                <tr align="center">
                  <td style="padding: 0">
                    <img
                      src="https://api.smtprelay.co/userfile/49540e0f-2e09-4101-a05d-5032842b99d3/check-icon.png"
                      width="74"
                      height=""
                      alt=""
                      style="
                        border-radius: 0px;
                        display: block;
                        height: auto;
                        max-width: 100%;
                        border: 0;
                      "
                      class="g-img"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td
            style="
              padding-top: 40px;
              padding-left: 0;
              padding-right: 0;
              padding-bottom: 0;
              background-color: #fff9f9;
            "
          >
            <table
              role="presentation"
              class="multi-column"
              style="width: 449px; border-collapse: collapse !important"
              cellpadding="0"
              cellspacing="0"
            >
              <tbody>
                <tr
                  style="
                    padding-top: 40px;
                    padding-left: 0;
                    padding-right: 0;
                    padding-bottom: 0;
                  "
                  class="wp-block-editor-onecolumnsblock-v1"
                >
                  <td
                    style="width: 449px; float: left"
                    class="wp-block-editor-column single-column"
                  >
                    <table
                      role="presentation"
                      align="left"
                      border="0"
                      class="single-column"
                      width="449"
                      style="
                        width: 449px;
                        float: left;
                        border-collapse: collapse !important;
                      "
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tbody>
                        <tr class="wp-block-editor-headingblock-v1">
                          <td
                            valign="top"
                            style="
                              background-color: #fff9f9;
                              display: block;
                              padding-top: 20px;
                              padding-right: 40px;
                              padding-bottom: 20px;
                              padding-left: 40px;
                              text-align: left;
                            "
                          >
                            <p
                              style="
                                font-family: Montserrat, sans-serif;
                                text-align: left;
                                letter-spacing: 0;
                                font-size: 30px;
                                background-color: #fff9f9;
                                color: #000000;
                                margin: 0;
                                word-break: normal;
                              "
                              class="heading2"
                            >
                              خطوة واحدة أخرى – لتأكيد حسابك
                            </p>
                          </td>
                        </tr>
                        <tr class="wp-block-editor-paragraphblock-v1">
                          <td
                            valign="top"
                            style="
                              padding: 12px 40px 12px 40px;
                              background-color: #fff9f9;
                            "
                          >
                            <p
                              class="paragraph"
                              style="
                                font-family: Open Sans, sans-serif;
                                font-size: 16px;
                                margin: 0;
                                color: #535353;
                                letter-spacing: 0;
                                word-break: normal;
                              "
                            >
                              مرحبا,<br /><br />"أنت على وشك الانتهاء! لتفعيل
                              حسابك على E-commarce وبدء إنشاء سير العمل الإنتاجي
                              الخاص بك، يرجى تأكيد عنوان بريدك الإلكتروني:"
                            </p>
                          </td>
                        </tr>
                        <tr class="wp-block-editor-buttonblock-v1" align="left">
                          <td
                            style="
                              background-color: #fff9f9;
                              padding-top: 24px;
                              padding-right: 40px;
                              padding-bottom: 24px;
                              padding-left: 40px;
                              width: 100%;
                            "
                            valign="top"
                          >
                            <table
                              role="presentation"
                              cellspacing="0"
                              cellpadding="0"
                              class="button-table"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    valign="top"
                                    class="button-49Z3VsjcpMwdevDvavM9g button-td button-td-primary"
                                    style="
                                      cursor: pointer;
                                      border: none;
                                      border-radius: 4px;
                                      background-color: #5457ff;
                                      font-size: 16px;
                                      font-family: Open Sans, sans-serif;
                                      width: fit-content;
                                      direction: ltr;
                                      text-decoration: none;
                                      letter-spacing: 0;
                                      color: #ffffff;
                                      overflow: hidden;
                                    "
                                  >
                                    <a
                                      style="
                                        color: #ffffff;
                                        display: block;
                                        padding: 16px 24px 16px 24px;
                                      "
                                      href="${activeLink}"
                                      >Confirm My Email</a
                                    >
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr class="wp-block-editor-paragraphblock-v1">
          <td
            valign="top"
            style="padding: 24px 40px 40px 40px; background-color: #fff9f9"
          >
            <p
              class="paragraph"
              style="
                font-family: Open Sans, sans-serif;
                font-size: 16px;
                margin: 0;
                color: #535353;
                letter-spacing: 0;
                word-break: normal;
              "
            >
              "يساعدنا ذلك في الحفاظ على أمان حسابك ويضمن لك تلقي التحديثات
              الهامة. إذا لم تكن قد قمت بالتسجيل في E-commarce، يمكنك تجاهل هذا
              البريد الإلكتروني."<br /><br />"أهلاً وسهلاً بك!<br />
              E-commarce فريق
            </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              padding-top: 20px;
              padding-left: 0;
              padding-right: 0;
              padding-bottom: 20px;
              background-color: #202146;
            "
          >
            <table
              role="presentation"
              class="multi-column"
              style="width: 449px; border-collapse: collapse !important"
              cellpadding="0"
              cellspacing="0"
            >
              <tbody>
                <tr
                  style="
                    padding-top: 20px;
                    padding-left: 0;
                    padding-right: 0;
                    padding-bottom: 20px;
                  "
                  class="wp-block-editor-onecolumnsblock-v1"
                >
                  <td
                    style="width: 449px; float: left"
                    class="wp-block-editor-column single-column"
                  >
                    <table
                      role="presentation"
                      align="left"
                      border="0"
                      class="single-column"
                      width="449"
                      style="
                        width: 449px;
                        float: left;
                        border-collapse: collapse !important;
                      "
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tbody>
                        <tr
                          class="wp-block-editor-socialiconsblock-v1"
                          role="article"
                          aria-roledescription="social-icons"
                          style="display: table-row; background-color: #202146"
                        >
                          <td style="width: 100%">
                            <table
                              style="
                                background-color: #202146;
                                width: 100%;
                                padding-top: 42px;
                                padding-bottom: 32px;
                                padding-left: 32px;
                                padding-right: 32px;
                                border-collapse: separate !important;
                              "
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                            >
                              <tbody>
                                <tr>
                                  <td align="center" valign="top">
                                    <div style="max-width: 385px">
                                      <table
                                        role="presentation"
                                        style="width: 100%"
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td valign="top">
                                              <div
                                                style="
                                                  margin-left: auto;
                                                  margin-right: auto;
                                                  margin-top: -5px;
                                                  margin-bottom: -5px;
                                                  width: 100%;
                                                  max-width: 208px;
                                                "
                                              >
                                                <table
                                                  role="presentation"
                                                  style="padding-left: 88.5"
                                                  width="100%"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td>
                                                        <table
                                                          role="presentation"
                                                          align="left"
                                                          style="float: left"
                                                          class="single-social-icon"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                valign="top"
                                                                style="
                                                                  padding-top: 5px;
                                                                  padding-bottom: 5px;
                                                                  padding-left: 10px;
                                                                  padding-right: 10px;
                                                                  border-collapse: collapse !important;
                                                                  border-spacing: 0;
                                                                  font-size: 0;
                                                                "
                                                              >
                                                                <a
                                                                  class="social-icon--link"
                                                                  href="https://facebook.com"
                                                                  target="_blank"
                                                                  rel="noreferrer"
                                                                  ><img
                                                                    src="https://d2u6lzrmbvw8bs.cloudfront.net/assets/social-icons/facebook/facebook-square-outline-white.png"
                                                                    width="32"
                                                                    height="32"
                                                                    style="
                                                                      max-width: 32px;
                                                                      display: block;
                                                                      border: 0;
                                                                    "
                                                                    alt="Facebook"
                                                                /></a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <table
                                                          role="presentation"
                                                          align="left"
                                                          style="float: left"
                                                          class="single-social-icon"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                valign="top"
                                                                style="
                                                                  padding-top: 5px;
                                                                  padding-bottom: 5px;
                                                                  padding-left: 10px;
                                                                  padding-right: 10px;
                                                                  border-collapse: collapse !important;
                                                                  border-spacing: 0;
                                                                  font-size: 0;
                                                                "
                                                              >
                                                                <a
                                                                  class="social-icon--link"
                                                                  href="https://twitter.com"
                                                                  target="_blank"
                                                                  rel="noreferrer"
                                                                  ><img
                                                                    src="https://d2u6lzrmbvw8bs.cloudfront.net/assets/social-icons/x/x-square-outline-white.png"
                                                                    width="32"
                                                                    height="32"
                                                                    style="
                                                                      max-width: 32px;
                                                                      display: block;
                                                                      border: 0;
                                                                    "
                                                                    alt="X (formerly Twitter)"
                                                                /></a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <table
                                                          role="presentation"
                                                          align="left"
                                                          style="float: left"
                                                          class="single-social-icon"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                valign="top"
                                                                style="
                                                                  padding-top: 5px;
                                                                  padding-bottom: 5px;
                                                                  padding-left: 10px;
                                                                  padding-right: 10px;
                                                                  border-collapse: collapse !important;
                                                                  border-spacing: 0;
                                                                  font-size: 0;
                                                                "
                                                              >
                                                                <a
                                                                  class="social-icon--link"
                                                                  href="https://youtube.com"
                                                                  target="_blank"
                                                                  rel="noreferrer"
                                                                  ><img
                                                                    src="https://d2u6lzrmbvw8bs.cloudfront.net/assets/social-icons/youtube/youtube-square-outline-white.png"
                                                                    width="32"
                                                                    height="32"
                                                                    style="
                                                                      max-width: 32px;
                                                                      display: block;
                                                                      border: 0;
                                                                    "
                                                                    alt="Youtube"
                                                                /></a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <table
                                                          role="presentation"
                                                          align="left"
                                                          style="float: left"
                                                          class="single-social-icon"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                valign="top"
                                                                style="
                                                                  padding-top: 5px;
                                                                  padding-bottom: 5px;
                                                                  padding-left: 10px;
                                                                  padding-right: 10px;
                                                                  border-collapse: collapse !important;
                                                                  border-spacing: 0;
                                                                  font-size: 0;
                                                                "
                                                              >
                                                                <a
                                                                  class="social-icon--link"
                                                                  href="https://linkedin.com"
                                                                  target="_blank"
                                                                  rel="noreferrer"
                                                                  ><img
                                                                    src="https://d2u6lzrmbvw8bs.cloudfront.net/assets/social-icons/linkedin/linkedin-square-outline-white.png"
                                                                    width="32"
                                                                    height="32"
                                                                    style="
                                                                      max-width: 32px;
                                                                      display: block;
                                                                      border: 0;
                                                                    "
                                                                    alt="LinkedIn"
                                                                /></a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td
                            valign="top"
                            align="center"
                            style="
                              padding: 20px 20px 20px 20px;
                              background-color: #202146;
                            "
                          >
                            <p
                              aria-label="Unsubscribe"
                              class="paragraph"
                              style="
                                font-family: Open Sans, sans-serif;
                                text-align: center;
                                line-height: 22px;
                                font-size: 11px;
                                margin: 0;
                                color: #535353;
                                word-break: normal;
                              "
                            >
                              <span style="color: #ffffff"
                                >If you no longer wish to receive mail from us,
                                you can</span
                              >
                              <a
                                class="c0c4d759-1c22-48d4-a614-785d6acaf420-6V201gHRzhDxAzaNqZiJS"
                                href="{unsubscribe}"
                                data-type="mergefield"
                                data-id="c0c4d759-1c22-48d4-a614-785d6acaf420-6V201gHRzhDxAzaNqZiJS"
                                data-filename=""
                                style="color: #5457ff; display: inline-block"
                                data-mergefield-value="unsubscribe"
                                data-mergefield-input-value=""
                                >unsubscribe</a
                              >.<br /><span style="color: #ffffff"
                                >{accountaddress}</span
                              >
                            </p>
                          </td>
                        </tr>
                        <tr class="wp-block-editor-paragraphblock-v1">
                          <td
                            valign="top"
                            style="
                              padding: 12px 12px 12px 12px;
                              background-color: #202146;
                            "
                          >
                            <p
                              class="paragraph"
                              style="
                                font-family: Open Sans, sans-serif;
                                text-align: center;
                                line-height: 11.5px;
                                font-size: 10px;
                                margin: 0;
                                color: #535353;
                                word-break: normal;
                              "
                            >
                              <span style="color: #ffffff"
                                >Unable to view? Read it</span
                              >
                              <a
                                class="62d10d6d-b252-49a7-af10-c771dbd58b15-Xzt0XJLlayJkgPI0XyMI5"
                                href="{view}"
                                data-type="mergefield"
                                data-id="62d10d6d-b252-49a7-af10-c771dbd58b15-Xzt0XJLlayJkgPI0XyMI5"
                                data-filename=""
                                style="color: #5457ff; display: inline-block"
                                data-mergefield-value="view"
                                data-mergefield-input-value=""
                                >Online</a
                              >
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
`;
  return emailTemplate;
};
