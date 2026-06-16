; Inno Setup Script for BenAjlan Smart Accounting System
; م.الحسين بن عجلان - نظام المحاسب الذكي

#define MyAppName "المحاسب الذكي BenAjlan"
#ifndef MyAppVersion
#define MyAppVersion "3.2.8"
#endif
#define MyAppPublisher "م.الحسين بن عجلان"
#define MyAppURL "https://benajlan.com"
#define MyAppExeName "المحاسب الذكي BenAjlan.exe"
#define MyAppId "{{EC1D7ECA-B2E8-51DB-A08F-235E38909027}"

[Setup]
AppId={#MyAppId}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\BenAjlan Smart Accounting
DefaultGroupName={#MyAppName}
AllowNoIcons=yes
LicenseFile=..\LICENSE.rtf
OutputDir=..\..\GoldBuild
OutputBaseFilename=BenAjlan-Setup-{#MyAppVersion}
SetupIconFile=..\resources\icon.ico
Compression=lzma2/max
SolidCompression=yes
WizardStyle=modern
PrivilegesRequired=admin
SetupLogging=yes
CloseApplications=yes
RestartApplications=no
PrivilegesRequiredOverridesAllowed=dialog
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
UninstallDisplayIcon={app}\{#MyAppExeName}
DisableProgramGroupPage=yes
DisableWelcomePage=no
ShowLanguageDialog=no

; Arabic Language Support
LanguageDetectionMethod=none
UninstallDisplayName={#MyAppName}

[LangOptions]
arabic.DialogFontName=Cairo
arabic.DialogFontSize=10
arabic.WelcomeFontName=Cairo
arabic.WelcomeFontSize=12
arabic.TitleFontName=Cairo
arabic.TitleFontSize=29
arabic.CopyrightFontName=Cairo
arabic.CopyrightFontSize=8

[Languages]
Name: "arabic"; MessagesFile: "compiler:Languages\Arabic.isl"

[CustomMessages]
arabic.WelcomeLabel1=مرحباً بك في معالج تثبيت
arabic.WelcomeLabel2=المحاسب الذكي BenAjlan
arabic.ClickNext=اضغط التالي للمتابعة، أو إلغاء للخروج من التثبيت.
arabic.SelectDirLabel=اختر المجلد الذي تريد تثبيت البرنامج فيه
arabic.SelectDirBrowseLabel=للمتابعة، اضغط التالي. لاختيار مجلد آخر، اضغط استعراض.
arabic.DiskSpaceGBLabel=يتطلب البرنامج على الأقل [gb] جيجابايت من المساحة الحرة.
arabic.DiskSpaceMBLabel=يتطلب البرنامج على الأقل [mb] ميجابايت من المساحة الحرة.
arabic.FinishedHeadingLabel=اكتمل تثبيت المحاسب الذكي BenAjlan
arabic.FinishedLabel=تم تثبيت البرنامج بنجاح على جهازك.
arabic.FinishedLabelNoIcons=تم تثبيت البرنامج بنجاح.
arabic.ClickFinish=اضغط إنهاء للخروج من معالج التثبيت.
arabic.SetupAppRunningError=التثبيت اكتشف أن %1 يعمل حالياً.%n%nالرجاء إغلاق جميع نوافذ البرنامج الآن، ثم اضغط موافق للمتابعة، أو إلغاء للخروج.
arabic.UninstallAppRunningError=الإزالة اكتشفت أن %1 يعمل حالياً.%n%nالرجاء إغلاق جميع نوافذ البرنامج الآن، ثم اضغط موافق للمتابعة، أو إلغاء للخروج.

; Uninstaller custom messages
arabic.UninstallStatusLabel=جاري إزالة %1 من جهازك...
arabic.UninstalledAll=تمت إزالة %1 بنجاح من جهازك.
arabic.UninstalledMost=اكتملت إزالة %1.%n%nبعض العناصر لم يمكن إزالتها. يمكنك إزالتها يدوياً.
arabic.UninstalledAndNeedsRestart=لإكمال إزالة %1، يجب إعادة تشغيل الجهاز.%n%nهل تريد إعادة التشغيل الآن؟
arabic.UninstallDataPrompt=قبل إكمال الإزالة اختر ما الذي تريده للبيانات والإعدادات: نعم للاحتفاظ، ولا للحذف النهائي.
arabic.ConfirmUninstall=هل أنت متأكد من رغبتك في إزالة %1 وجميع مكوناته بالكامل؟
arabic.OnlyAdminCanUninstall=يمكن إزالة هذا البرنامج فقط من قبل مستخدم لديه صلاحيات المسؤول.
arabic.UninstallOpenError=لا يمكن إزالة الملف '%1'. الملف قيد الاستخدام
arabic.UninstallUnsupportedVer=ملف سجل الإزالة '%1' بصيغة غير معروفة لهذا الإصدار من برنامج الإزالة

[Tasks]
Name: "desktopicon"; Description: "إنشاء اختصار على سطح المكتب"; GroupDescription: "اختصارات إضافية:"
Name: "quicklaunchicon"; Description: "إنشاء اختصار في شريط المهام"; GroupDescription: "اختصارات إضافية:"; Flags: unchecked

[Files]
Source: "..\..\GoldBuild\win-unpacked\database\*"; DestDir: "{app}\database"; Flags: ignoreversion recursesubdirs createallsubdirs uninsneveruninstall
Source: "..\..\GoldBuild\win-unpacked\data\*"; DestDir: "{app}\data"; Flags: ignoreversion recursesubdirs createallsubdirs uninsneveruninstall
Source: "..\..\GoldBuild\win-unpacked\*"; Excludes: "database\*,data\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "..\resources\icon.ico"; DestDir: "{app}\resources"; Flags: ignoreversion
Source: "..\LICENSE.rtf"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\README.md"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\resources\icon.ico"
Name: "{group}\إزالة {#MyAppName}"; Filename: "{uninstallexe}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\resources\icon.ico"; Tasks: desktopicon
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: quicklaunchicon

[Code]
var
  KeepDataOnUpgrade: Boolean;
  KeepDataOnUninstall: Boolean;
  PreviousInstallDir: String;
  UpgradeBackupPath: String;
  UpgradeBackupCreated: Boolean;
  UpgradeUninstallError: String;
  UpgradeUninstallExitCode: Integer;

function GetUninstallString(): String;
var
  sUnInstPath: String;
  sUnInstallString: String;
begin
  sUnInstPath := ExpandConstant('Software\Microsoft\Windows\CurrentVersion\Uninstall\{#emit SetupSetting("AppId")}_is1');
  sUnInstallString := '';
  if not RegQueryStringValue(HKLM, sUnInstPath, 'UninstallString', sUnInstallString) then
    RegQueryStringValue(HKCU, sUnInstPath, 'UninstallString', sUnInstallString);
  Result := sUnInstallString;
end;

function IsUpgrade(): Boolean;
begin
  Result := (GetUninstallString() <> '');
end;

function GetPreviousInstallDir(): String;
var
  sUnInstPath: String;
  DefaultInstallDir: String;
begin
  sUnInstPath := ExpandConstant('Software\Microsoft\Windows\CurrentVersion\Uninstall\{#emit SetupSetting("AppId")}_is1');
  Result := '';
  if not RegQueryStringValue(HKLM, sUnInstPath, 'InstallLocation', Result) then
    RegQueryStringValue(HKCU, sUnInstPath, 'InstallLocation', Result);
  Result := Trim(Result);
  DefaultInstallDir := ExpandConstant('{autopf}\BenAjlan Smart Accounting');
  if (Result = '') or (not DirExists(Result)) then
  begin
    if DirExists(DefaultInstallDir) then
      Result := DefaultInstallDir
    else
      Result := '';
  end;
end;

procedure SplitCommandText(const CommandText: String; var ExecFile, ExecParams: String);
var
  Text: String;
  SeparatorPos: Integer;
begin
  Text := Trim(CommandText);
  ExecFile := '';
  ExecParams := '';
  if Text = '' then
    Exit;

  if Copy(Text, 1, 1) = '"' then
  begin
    Delete(Text, 1, 1);
    SeparatorPos := Pos('"', Text);
    if SeparatorPos > 0 then
    begin
      ExecFile := Copy(Text, 1, SeparatorPos - 1);
      ExecParams := Trim(Copy(Text, SeparatorPos + 1, Length(Text)));
    end
    else
      ExecFile := Text;
    Exit;
  end;

  SeparatorPos := Pos(' ', Text);
  if SeparatorPos > 0 then
  begin
    ExecFile := Copy(Text, 1, SeparatorPos - 1);
    ExecParams := Trim(Copy(Text, SeparatorPos + 1, Length(Text)));
  end
  else
    ExecFile := Text;
end;

function CopyDirectory(const SourceDir, DestDir: String): Boolean;
var
  FindRec: TFindRec;
begin
  Result := True;
  if not DirExists(SourceDir) then
    Exit;

  if not DirExists(DestDir) then
    if not CreateDir(DestDir) then
    begin
      Result := False;
      Exit;
    end;

  if FindFirst(AddBackslash(SourceDir) + '*', FindRec) then
  begin
    try
      repeat
        if (FindRec.Name <> '.') and (FindRec.Name <> '..') then
        begin
          if (FindRec.Attributes and FILE_ATTRIBUTE_DIRECTORY) <> 0 then
          begin
            if not CopyDirectory(AddBackslash(SourceDir) + FindRec.Name, AddBackslash(DestDir) + FindRec.Name) then
            begin
              Result := False;
              Exit;
            end;
          end
          else if not FileCopy(AddBackslash(SourceDir) + FindRec.Name, AddBackslash(DestDir) + FindRec.Name, False) then
          begin
            Result := False;
            Exit;
          end;
        end;
      until not FindNext(FindRec);
    finally
      FindClose(FindRec);
    end;
  end;
end;

procedure DeletePersistentDataAt(const InstallDir: String);
var
  DataPath: String;
begin
  if InstallDir = '' then
    Exit;

  DataPath := AddBackslash(InstallDir) + 'database';
  if DirExists(DataPath) then
    DelTree(DataPath, True, True, True);

  DataPath := AddBackslash(InstallDir) + 'data';
  if DirExists(DataPath) then
    DelTree(DataPath, True, True, True);
end;

function BackupPersistentData(const InstallDir: String): Boolean;
var
  AppDataRoot: String;
  SourcePath: String;
begin
  Result := True;
  UpgradeBackupCreated := False;

  if InstallDir = '' then
    Exit;

  AppDataRoot := ExpandConstant('{commonappdata}\BenAjlan Smart Accounting');
  if not DirExists(AppDataRoot) then
    if not CreateDir(AppDataRoot) then
    begin
      Result := False;
      Exit;
    end;

  UpgradeBackupPath := AddBackslash(AppDataRoot) + 'installer-backup';

  if DirExists(UpgradeBackupPath) then
    DelTree(UpgradeBackupPath, True, True, True);

  if not CreateDir(UpgradeBackupPath) then
  begin
    Result := False;
    Exit;
  end;

  SourcePath := AddBackslash(InstallDir) + 'database';
  if DirExists(SourcePath) then
  begin
    if not CopyDirectory(SourcePath, AddBackslash(UpgradeBackupPath) + 'database') then
    begin
      Result := False;
      Exit;
    end;
    UpgradeBackupCreated := True;
  end;

  SourcePath := AddBackslash(InstallDir) + 'data';
  if DirExists(SourcePath) then
  begin
    if not CopyDirectory(SourcePath, AddBackslash(UpgradeBackupPath) + 'data') then
    begin
      Result := False;
      Exit;
    end;
    UpgradeBackupCreated := True;
  end;
end;

function RestorePersistentData(const InstallDir: String): Boolean;
var
  SourcePath: String;
begin
  Result := True;

  if (InstallDir = '') or (UpgradeBackupPath = '') or (not UpgradeBackupCreated) then
    Exit;

  SourcePath := AddBackslash(UpgradeBackupPath) + 'database';
  if DirExists(SourcePath) then
    if not CopyDirectory(SourcePath, AddBackslash(InstallDir) + 'database') then
    begin
      Result := False;
      Exit;
    end;

  SourcePath := AddBackslash(UpgradeBackupPath) + 'data';
  if DirExists(SourcePath) then
    if not CopyDirectory(SourcePath, AddBackslash(InstallDir) + 'data') then
    begin
      Result := False;
      Exit;
    end;
end;

procedure ClearUpgradeBackup();
begin
  if (UpgradeBackupPath <> '') and DirExists(UpgradeBackupPath) then
    DelTree(UpgradeBackupPath, True, True, True);
  UpgradeBackupCreated := False;
end;

function HasCustomUninstallSwitch(const SwitchName: String): Boolean;
var
  CmdTail: String;
begin
  CmdTail := ' ' + Uppercase(GetCmdTail()) + ' ';
  Result := Pos(' ' + Uppercase(SwitchName) + ' ', CmdTail) > 0;
end;

function UnInstallOldVersion(): Integer;
var
  UninstallParams: String;
  sUnInstallString: String;
  UninstallExe: String;
  UninstallExistingParams: String;
  iResultCode: Integer;
begin
  Result := 0;
  UpgradeUninstallError := '';
  UpgradeUninstallExitCode := 0;
  sUnInstallString := Trim(GetUninstallString());
  if sUnInstallString <> '' then begin
    SplitCommandText(sUnInstallString, UninstallExe, UninstallExistingParams);
    if UninstallExe = '' then
    begin
      UpgradeUninstallError := 'تعذر قراءة مسار إزالة النسخة السابقة من سجل النظام.';
      Result := 2;
      Exit;
    end;
    if not FileExists(UninstallExe) then
    begin
      UpgradeUninstallError := 'ملف إزالة النسخة السابقة غير موجود:' + #13#10 + UninstallExe;
      Result := 2;
      Exit;
    end;
    UninstallParams := Trim(UninstallExistingParams + ' /VERYSILENT /NORESTART /SUPPRESSMSGBOXES');
    if KeepDataOnUpgrade then
      UninstallParams := UninstallParams + ' /KEEP_APP_DATA'
    else
      UninstallParams := UninstallParams + ' /DELETE_APP_DATA';
    if Exec(UninstallExe, Trim(UninstallParams), ExtractFileDir(UninstallExe), SW_HIDE, ewWaitUntilTerminated, iResultCode) then
    begin
      UpgradeUninstallExitCode := iResultCode;
      if iResultCode = 0 then
        Result := 3
      else
      begin
        UpgradeUninstallError := 'أداة إزالة النسخة السابقة أغلقت برمز:' + #13#10 + IntToStr(iResultCode);
        Result := 4;
      end;
    end
    else
    begin
      UpgradeUninstallError := 'تعذر تشغيل أداة إزالة النسخة السابقة:' + #13#10 + UninstallExe;
      Result := 2;
    end;
  end else
    Result := 1;
end;

function InitializeSetup(): Boolean;
var
  ResultCode: Integer;
begin
  Result := True;
  KeepDataOnUpgrade := False;
  KeepDataOnUninstall := True;
  PreviousInstallDir := GetPreviousInstallDir();
  UpgradeBackupPath := '';
  UpgradeBackupCreated := False;
  UpgradeUninstallError := '';
  UpgradeUninstallExitCode := 0;

  // Check if application is running
  if CheckForMutexes('BenAjlanSmartAccounting') then
  begin
    if MsgBox('البرنامج يعمل حالياً. يجب إغلاقه قبل المتابعة.' + #13#10 + 'هل تريد إغلاق البرنامج والمتابعة؟', 
              mbConfirmation, MB_YESNO) = IDYES then
    begin
      // Try to close the application gracefully
      Exec('taskkill', '/F /IM "' + '{#MyAppExeName}' + '"', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
      Sleep(1000);
    end
    else
    begin
      Result := False;
      Exit;
    end;
  end;

  // Check if old version exists and uninstall it
  if IsUpgrade() then
  begin
    if MsgBox('تم اكتشاف نسخة سابقة من البرنامج.' + #13#10 + 'سيتم إزالتها تلقائياً قبل تثبيت النسخة الجديدة.' + #13#10#13#10 + 'هل تريد المتابعة؟', mbConfirmation, MB_YESNO) = IDYES then
    begin
      KeepDataOnUpgrade := MsgBox('هل تريد الاحتفاظ بقاعدة البيانات والإعدادات الحالية أثناء التحديث؟' + #13#10 + 'اختر "نعم" للاحتفاظ بالبيانات الحالية، أو "لا" لحذفها قبل تثبيت النسخة الجديدة.', mbConfirmation, MB_YESNO) = IDYES;
      if KeepDataOnUpgrade then
      begin
        if not BackupPersistentData(PreviousInstallDir) then
        begin
          MsgBox('تعذر إنشاء نسخة احتياطية من البيانات الحالية، لذلك تم إيقاف التثبيت حتى لا تضيع البيانات.', mbCriticalError, MB_OK);
          Result := False;
          Exit;
        end;
      end;

      ResultCode := UnInstallOldVersion();
      if ResultCode = 2 then
      begin
        if MsgBox('تعذر تشغيل إزالة النسخة السابقة تلقائياً.' + #13#10#13#10 + UpgradeUninstallError + #13#10#13#10 + 'يمكن متابعة التثبيت فوق النسخة الحالية بدون إغلاق المثبت.' + #13#10 + 'هل تريد المتابعة؟', mbConfirmation, MB_YESNO) <> IDYES then
        begin
          Result := False;
          Exit;
        end;
      end;
      if ResultCode = 4 then
      begin
        if MsgBox('لم تكتمل إزالة النسخة السابقة بشكل كامل.' + #13#10#13#10 + UpgradeUninstallError + #13#10#13#10 + 'يمكنك إعادة تشغيل الجهاز أو إزالة النسخة القديمة يدوياً، أو متابعة التثبيت فوق النسخة الحالية الآن.' + #13#10 + 'هل تريد المتابعة الآن؟', mbConfirmation, MB_YESNO) <> IDYES then
        begin
          Result := False;
          Exit;
        end;
      end;

      if ResultCode = 3 then
        Sleep(2000);

      if not KeepDataOnUpgrade then
        DeletePersistentDataAt(PreviousInstallDir);
    end
    else
    begin
      Result := False;
    end;
  end;
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssPostInstall then
  begin
    if KeepDataOnUpgrade and UpgradeBackupCreated then
    begin
      if RestorePersistentData(ExpandConstant('{app}')) then
        ClearUpgradeBackup()
      else
        MsgBox('تم تثبيت البرنامج، لكن تعذر استعادة البيانات المحفوظة تلقائياً.' + #13#10 + 'تم الاحتفاظ بالنسخة الاحتياطية هنا:' + #13#10 + UpgradeBackupPath, mbError, MB_OK);
    end;

    // Create backup directory if it doesn't exist
    if not DirExists(ExpandConstant('{app}\database\backup-databases')) then
      CreateDir(ExpandConstant('{app}\database\backup-databases'));
  end;
end;

function InitializeUninstall(): Boolean;
var
  ResultCode: Integer;
begin
  Result := True;
  KeepDataOnUninstall := True;

  // Check if application is running before uninstall
  if CheckForMutexes('BenAjlanSmartAccounting') then
  begin
    if MsgBox('البرنامج يعمل حالياً. يجب إغلاقه قبل الإزالة.' + #13#10 + 'هل تريد إغلاق البرنامج والمتابعة؟', 
              mbConfirmation, MB_YESNO) = IDYES then
    begin
      Exec('taskkill', '/F /IM "' + '{#MyAppExeName}' + '"', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
      Sleep(1000);
    end
    else
    begin
      Result := False;
    end;
  end;

  if not Result then
    Exit;

  if HasCustomUninstallSwitch('/KEEP_APP_DATA') then
    KeepDataOnUninstall := True
  else if HasCustomUninstallSwitch('/DELETE_APP_DATA') then
    KeepDataOnUninstall := False
  else
    KeepDataOnUninstall := MsgBox('قبل إكمال إزالة البرنامج، اختر ما الذي تريد أن يحدث للبيانات الحالية:' + #13#10 + 'نعم = الاحتفاظ بقاعدة البيانات والإعدادات' + #13#10 + 'لا = حذف قاعدة البيانات والإعدادات نهائياً', mbConfirmation, MB_YESNO) = IDYES;
end;

procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
begin
  if CurUninstallStep = usPostUninstall then
  begin
    if not KeepDataOnUninstall then
      DeletePersistentDataAt(ExpandConstant('{app}'));
  end;
end;
