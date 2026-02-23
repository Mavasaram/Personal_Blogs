---
title: "SRM Smartforms."
date: 2009-04-28
publishedAt: "2009-04-28T22:14:00.004+02:00"
labels: ["SAP", "Smartforms", "SRM"]
originalUrl: "https://mrmohan.blogspot.com/2009/04/srm-smartforms.html"
---
I just thought, why shouldn't use my lovely space to portray my small small inventions (discoveries ?) :) in my Day-to-Day SAP Life.

If you are really interested in SAP. Here it goes. How to customize Smart forms in SRM.

Scope: How to customize an existing Standard Smart form in SRM - Overview.
Copy smart form BBP_PO into "Z'' Smart formDo changes in Z Smart form add Desired Logos in Smart form using SE78 and SMARTFORMS transactions.Unlike ECC we will not have Driver program (in SE38), you will find Processing class and Processing method ( in SE24) for SRM Smart forms, where we write extraction logic.So, In case of SRM we should replace the "Driver Program" with "Processing Class" and Perform as "Processing Method".Where to Link Processing Class, Processing Method and Smart form?                              In SPRO, SRM Server -> Cross Apps -> Set Output Actions and Output Format -> Define Actions for Purchase Order Output -> Action definition -> Processing types, then select standard PO.If we are using Custom Form instead of Standard Smartform, then Don't change any settings in Step5, Just Implement BADI - BBP_OUTPUT_CHANGE_SF in SE19 transaction.Put a simple code in BADI as...                                                                                                       IF IV_OBJECT_TYPE eq 'BUS2201' . CV_SMARTFORM = 'Z_CustomSF'. ENDIF.Don't forget you already copied Standard SF to Custom SF in Step 1 so use it in Step 7.
Why can't you try it once!!

Till next time..
- Mvk.
