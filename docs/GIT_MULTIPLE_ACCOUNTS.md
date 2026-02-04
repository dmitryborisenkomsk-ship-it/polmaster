# Push под своим GitHub-аккаунтом (без смены глобального Git config)

Чтобы в **этом репозитории** пушить от аккаунта **dmitryborisenkomsk-ship-it**, пока на машине по умолчанию используется другой аккаунт (goosen-x), используйте **отдельный SSH-ключ и алиас в `~/.ssh/config`**. Глобальные `user.name` и `user.email` менять не нужно.

## 1. Отдельный SSH-ключ для вашего аккаунта

Создайте ключ с отдельным именем (чтобы не трогать ключ goosen-x):

```bash
ssh-keygen -t ed25519 -C "ваш-email@example.com" -f ~/.ssh/id_ed25519_polmaster
```

При запросе passphrase можно задать или оставить пустым.

## 2. Добавьте публичный ключ в GitHub

- Скопируйте ключ в буфер: `pbcopy < ~/.ssh/id_ed25519_polmaster.pub`
- Зайдите на GitHub под **dmitryborisenkomsk-ship-it**
- Settings → SSH and GPG keys → New SSH key → вставьте ключ, сохраните

## 3. Настройте алиас в `~/.ssh/config`

Откройте (или создайте) файл `~/.ssh/config` и добавьте:

```
Host github-polmaster
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_polmaster
  IdentitiesOnly yes
```

- **Host** — произвольное имя (алиас), в URL репозитория будет использоваться оно вместо `github.com`.
- **IdentitiesOnly yes** — использовать только этот ключ, не подставлять другие.

## 4. Remote в этом репозитории уже переведён на SSH

В проекте уже настроен origin на алиас:

```
origin  git@github-polmaster:dmitryborisenkomsk-ship-it/polmaster.git
```

Проверка:

```bash
ssh -T git@github-polmaster
```

Должно появиться: `Hi dmitryborisenkomsk-ship-it! You've successfully authenticated...`

## 5. Push

```bash
cd /Users/dmitryborisenko/Documents/docs/vibecodecourse2/floor-haven
git push -u origin main
```

Остальные репозитории продолжают использовать `github.com` и ключ goosen-x; глобальный Git config не меняется.

---

Источники: [Multiple GitHub accounts (w3tutorials)](https://www.w3tutorials.net/blog/multiple-github-accounts-on-the-same-computer/), [SSH config for multiple accounts (Stack Overflow)](https://stackoverflow.com/questions/3225862/multiple-github-accounts-ssh-config).
